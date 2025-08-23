export function slugify(text: string) {
    return text
        .toLowerCase()
        .normalize("NFD") 
        .replace(/[\u0300-\u036f]/g, "") 
        .replace(/[^a-z0-9ğüşöçıöç\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
}

export function toProductSlug(title: string, id: number | string) {
    return `${slugify(title)}-${id}`;
}

export function getIdFromSlug(slug: string) {
   
    const parts = slug.split("-");
    const idPart = parts[parts.length - 1];
    const idNum = Number(idPart);
    if (Number.isNaN(idNum)) {
        throw new Error("Slug sonu numeric id içermeli");
    }
    return String(idNum);
}
