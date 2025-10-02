/**
 * Simple markdown to HTML converter for poem formatting
 * Handles basic markdown syntax: **bold**, *italic*, headers, and line breaks
 */
export const markdownToHtml = (markdown: string): string => {
  let html = markdown;

  // Convert headers (### Header)
  html = html.replace(
    /^### (.*$)/gim,
    '<h3 class="text-xl font-bold mb-2">$1</h3>'
  );
  html = html.replace(
    /^## (.*$)/gim,
    '<h2 class="text-2xl font-bold mb-3">$1</h2>'
  );
  html = html.replace(
    /^# (.*$)/gim,
    '<h1 class="text-3xl font-bold mb-4">$1</h1>'
  );

  // Convert bold text (**text**)
  html = html.replace(
    /\*\*(.+?)\*\*/g,
    '<strong class="font-bold text-white">$1</strong>'
  );

  // Convert italic text (*text*)
  html = html.replace(/\*(.+?)\*/g, '<em class="italic">$1</em>');

  // Convert line breaks
  html = html.replace(/\n\n/g, '</p><p class="mb-4">');
  html = html.replace(/\n/g, "<br />");

  // Wrap in paragraph tags
  html = `<p class="mb-4">${html}</p>`;

  return html;
};

/**
 * Remove markdown formatting to get plain text
 */
export const markdownToPlainText = (markdown: string): string => {
  return markdown
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/^#+\s+/gm, "")
    .trim();
};
