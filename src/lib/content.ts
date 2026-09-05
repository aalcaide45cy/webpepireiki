import { WebData, Therapy, Workshop, HarmonizationItem, Review, ShopProduct } from "@/types/content";
import { defaultWebData } from "@/data/defaultContent";
import { formatImageUrl } from "@/lib/drive";

/**
 * Función sencilla para parsear CSV proveniente del endpoint público de Google Sheets:
 * https://docs.google.com/spreadsheets/d/{ID}/gviz/tq?tqx=out:csv&sheet={SHEET_NAME}
 */
function parseCsvRows(csvText: string): Record<string, string>[] {
  const lines = csvText.split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (lines.length < 2) return [];

  const headers = parseCsvLine(lines[0]);
  const rows: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCsvLine(lines[i]);
    const row: Record<string, string> = {};
    headers.forEach((header, index) => {
      const cleanKey = header.trim().toLowerCase().replace(/[\s_-]+/g, "");
      row[cleanKey] = values[index] ? values[index].trim() : "";
    });
    rows.push(row);
  }

  return rows;
}

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

/**
 * Carga los datos de la web.
 * Si GOOGLE_SHEET_ID está configurado, intenta sincronizar con las pestañas de Google Sheets.
 * Si no está disponible o falla la red, recurre de forma transparente a defaultWebData.
 */
export async function getWebData(): Promise<WebData> {
  const sheetId = process.env.GOOGLE_SHEET_ID || process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;

  if (!sheetId) {
    return defaultWebData;
  }

  try {
    const fetchSheetTab = async (tabName: string) => {
      const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tabName)}`;
      const res = await fetch(url, {
        next: { revalidate: 3600, tags: ["google-sheet-data"] },
      });
      if (!res.ok) throw new Error(`Error al leer pestaña ${tabName}: ${res.statusText}`);
      const text = await res.text();
      return parseCsvRows(text);
    };

    const [terapiasRows, talleresRows, armonizacionRows, resenasRows, productosRows] = await Promise.allSettled([
      fetchSheetTab("Terapias"),
      fetchSheetTab("Talleres"),
      fetchSheetTab("Armonizacion"),
      fetchSheetTab("Reseñas"),
      fetchSheetTab("Productos"),
    ]);

    const updatedData: WebData = {
      ...defaultWebData,
      config: { ...defaultWebData.config },
      chakras: defaultWebData.chakras,
    };

    // 1. Terapias
    if (terapiasRows.status === "fulfilled" && terapiasRows.value.length > 0) {
      const customTherapies: Therapy[] = terapiasRows.value.map((row, idx) => {
        const id = row["id"] || `terapia-${idx + 1}`;
        const title = row["titulo"] || row["title"] || defaultWebData.therapies[0].title;
        const category = (row["categoria"] || "quiromasaje") as Therapy["category"];
        const rawImg = row["imagen"] || row["foto"] || row["imageurl"] || "";

        return {
          id,
          title,
          subtitle: row["subtitulo"] || row["subtitle"] || "",
          category,
          categoryLabel: row["etiqueta"] || "Terapia Holística",
          shortDescription: row["descripcioncorta"] || row["shortdescription"] || "",
          fullDescription: row["descripcioncompleta"] || row["fulldescription"] || "",
          benefits: (row["beneficios"] || "").split(";").map((b) => b.trim()).filter(Boolean),
          duration: row["duracion"] || "60 minutos",
          priceNote: row["precio"] || "Consultar",
          imageUrl: formatImageUrl(rawImg, defaultWebData.therapies[0].imageUrl),
          badge: row["destacado"] || undefined,
        };
      });
      if (customTherapies.length > 0) {
        updatedData.therapies = customTherapies;
      }
    }

    // 2. Talleres
    if (talleresRows.status === "fulfilled" && talleresRows.value.length > 0) {
      const customWorkshops: Workshop[] = talleresRows.value.map((row, idx) => {
        const rawImg = row["imagen"] || row["foto"] || "";
        return {
          id: row["id"] || `taller-${idx + 1}`,
          title: row["titulo"] || "Taller Holístico",
          subtitle: row["subtitulo"] || "",
          date: row["fecha"] || "Próximamente",
          time: row["horario"] || "Consultar",
          modality: (row["modalidad"] as Workshop["modality"]) || "Presencial",
          spots: row["plazas"] || "Plazas limitadas",
          description: row["descripcion"] || "",
          includes: (row["incluye"] || "").split(";").map((i) => i.trim()).filter(Boolean),
          imageUrl: formatImageUrl(rawImg, defaultWebData.workshops[0].imageUrl),
        };
      });
      if (customWorkshops.length > 0) {
        updatedData.workshops = customWorkshops;
      }
    }

    // 3. Armonización
    if (armonizacionRows.status === "fulfilled" && armonizacionRows.value.length > 0) {
      const customHarmonization: HarmonizationItem[] = armonizacionRows.value.map((row, idx) => {
        const rawImg = row["imagen"] || row["foto"] || "";
        return {
          id: row["id"] || `armonizacion-${idx + 1}`,
          title: row["titulo"] || "Elemento de Armonización",
          category: (row["categoria"] as HarmonizationItem["category"]) || "minerales",
          categoryLabel: row["etiqueta"] || "Armonización",
          description: row["descripcion"] || "",
          properties: (row["propiedades"] || "").split(";").map((p) => p.trim()).filter(Boolean),
          usageTip: row["consejo"] || "",
          imageUrl: formatImageUrl(rawImg, defaultWebData.harmonization[0].imageUrl),
        };
      });
      if (customHarmonization.length > 0) {
        updatedData.harmonization = customHarmonization;
      }
    }

    // 4. Reseñas
    if (resenasRows.status === "fulfilled" && resenasRows.value.length > 0) {
      const customReviews: Review[] = resenasRows.value.map((row, idx) => ({
        id: row["id"] || `resena-${idx + 1}`,
        author: row["nombre"] || row["autor"] || "Cliente Satisfecho",
        service: row["servicio"] || "Terapia Holística",
        rating: Number(row["puntuacion"] || row["estrellas"]) || 5,
        text: row["comentario"] || row["texto"] || "",
        date: row["fecha"] || "Reciente",
        verified: true,
      }));
      if (customReviews.length > 0) {
        updatedData.reviews = customReviews;
      }
    }

    // 5. Productos
    if (productosRows.status === "fulfilled" && productosRows.value.length > 0) {
      const customProducts: ShopProduct[] = productosRows.value.map((row, idx) => {
        const rawImg = row["imagen"] || row["foto"] || "";
        const priceNum = parseFloat(row["precio"]?.replace(",", ".") || "0") || 15.0;
        const origPriceNum = row["precioanterior"] ? parseFloat(row["precioanterior"]?.replace(",", ".")) : undefined;

        return {
          id: row["id"] || `producto-${idx + 1}`,
          name: row["nombre"] || row["titulo"] || "Producto Holístico",
          category: (row["categoria"] as ShopProduct["category"]) || "aromaterapia",
          categoryLabel: row["etiqueta"] || "Holístico",
          shortDescription: row["descripcioncorta"] || "",
          fullDescription: row["descripcioncompleta"] || row["descripcion"] || "",
          price: priceNum,
          originalPrice: origPriceNum,
          badge: row["destacado"] || undefined,
          benefits: (row["beneficios"] || "").split(";").map((b) => b.trim()).filter(Boolean),
          imageUrl: formatImageUrl(rawImg, "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80"),
          inStock: row["stock"]?.toLowerCase() !== "no" && row["disponible"]?.toLowerCase() !== "no",
        };
      });
      if (customProducts.length > 0) {
        updatedData.products = customProducts;
      }
    }

    return updatedData;
  } catch (error) {
    console.warn("No se pudo sincronizar con Google Sheets, usando datos por defecto:", error);
    return defaultWebData;
  }
}
