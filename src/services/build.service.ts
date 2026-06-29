export async function deploySite() {
  const response = await fetch(import.meta.env.PUBLIC_NETLIFY_BUILD_HOOK, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("No fue posible iniciar el deploy.");
  }

  return true;
}
