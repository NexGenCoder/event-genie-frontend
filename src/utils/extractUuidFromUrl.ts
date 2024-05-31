export const extractUuidFromUrl = (url: string): string | null => {
   const uuidRegex =
      /([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/i
   const match = url.match(uuidRegex)
   return match ? match[1] : null
}
