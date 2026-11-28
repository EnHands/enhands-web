// Shared Markdown rendering for blog posts (admin live preview + public post page).
import { Marked } from 'marked';

// Styling for all image captions (single images and grids)
const CAPTION_CLASSES = 'mt-2 text-xs italic text-gray-500';

/** @param {string} str */
const escapeHtml = (str) =>
    str.replace(/[&<>"']/g, (c) => /** @type {Record<string, string>} */ ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[c]);

/** @param {import('marked').Token} t */
const isBlank = (t) => t.type === 'br' || (t.type === 'text' && !t.text.trim());

const marked = new Marked({
    renderer: {
        /**
         * Images at the start of a paragraph are rendered as standalone blocks
         * instead of being wrapped in a <p>. The Markdown title becomes a caption:
         *     ![Alt text](url "Caption")
         * Any text following the images is rendered as a normal paragraph.
         * @param {import('marked').Tokens.Paragraph} token
         */
        paragraph({ tokens }) {
            // Collect the leading run of images (ignoring line breaks between them)
            let split = 0;
            while (split < tokens.length && (tokens[split].type === 'image' || isBlank(tokens[split]))) split++;
            const images = /** @type {import('marked').Tokens.Image[]} */ (
                tokens.slice(0, split).filter((t) => t.type === 'image')
            );
            if (images.length === 0) return false; // fall back to marked's default <p>

            const figures = images.map((image) => {
                const caption = image.title?.trim();
                // Render the <img> without the title attribute; the caption replaces it
                const img = this.image({ ...image, title: null });
                if (!caption) return img;
                return `<figure>${img}<figcaption class="${CAPTION_CLASSES}">${escapeHtml(caption)}</figcaption></figure>`;
            });

            // Text after the images (e.g. no blank line between image and text)
            const rest = tokens.slice(split);
            if (rest[0]?.type === 'text') rest[0] = { ...rest[0], text: rest[0].text.trimStart() };
            const text = rest.length ? `<p>${this.parser.parseInline(rest)}</p>\n` : '';

            return figures.join('\n') + '\n' + text;
        }
    }
});

/**
 * Converts blog Markdown (incl. our custom "::: GRID" blocks) to HTML.
 * Used by both the admin live preview and the public post page, so they always match.
 * @param {string} markdown
 * @returns {string}
 */
export function renderBlogMarkdown(markdown) {
    // Replaces a GRID block with a Tailwind grid of side-by-side images.
    // The optional quoted text on the opening line is one caption for the whole grid:
    //     ::: GRID "Caption"
    //     ![Image 1](url1)
    //     ![Image 2](url2)
    //     :::
    const withGrids = markdown.replace(
        /:::[ \t]*GRID[ \t]*(?:"([^"\n]*)")?[ \t]*\n([\s\S]*?)\n:::/g,
        (match, caption, innerContent) => {
            // Rendered as a block so the image-only paragraph rule applies:
            // every image becomes its own grid item (no <p> wrappers, no <br>s).
            const compiledImages = /** @type {string} */ (marked.parse(innerContent.trim()));
            const figcaption = caption?.trim()
                ? `<figcaption class="${CAPTION_CLASSES}">${escapeHtml(caption.trim())}</figcaption>`
                : '';
            // The <figure> provides the outer spacing (like single images), so the
            // grid items themselves get no vertical margin and the caption sits right below.
            return `<figure><div class="grid grid-cols-1 md:grid-cols-2 gap-4 [&>*]:my-0 [&_img]:my-0">\n${compiledImages.trim()}\n</div>${figcaption}</figure>\n\n`;
        }
    );

    return /** @type {string} */ (marked.parse(withGrids));
}
