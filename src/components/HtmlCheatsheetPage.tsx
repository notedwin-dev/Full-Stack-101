import { useEffect, useMemo, useRef } from 'react';
import parse from 'html-react-parser';
import htmlDocument from '../../html-cheatsheet.html?raw';

function extractTagContent(source: string, tagName: string) {
  const match = source.match(new RegExp(`<${tagName}>([\\s\\S]*?)</${tagName}>`, 'i'));

  return match?.[1]?.trim() ?? '';
}

export default function HtmlCheatsheetPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  const styles = useMemo(() => extractTagContent(htmlDocument, 'style'), []);
  const bodyMarkup = useMemo(() => extractTagContent(htmlDocument, 'body'), []);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    root.querySelectorAll('.code:not(.no-preview-toggle):not([data-enhanced="true"])').forEach((codeBlock) => {
      codeBlock.setAttribute('data-enhanced', 'true');
      const codeElement = codeBlock as HTMLElement;

      const shell = document.createElement('div');
      shell.className = 'example-shell';

      const preview = document.createElement('div');
      preview.className = 'render-preview';

      const toolbar = document.createElement('div');
      toolbar.className = 'example-toolbar';
      toolbar.innerHTML = `
        <button class="view-btn active" data-view="code">Code</button>
        <button class="view-btn" data-view="preview">Preview</button>
      `;

      const codeContent = codeElement.textContent?.trim() ?? '';
      const previewRoot = document.createElement('div');
      previewRoot.innerHTML = codeContent;

      previewRoot.querySelectorAll('img').forEach((img) => {
        const placeholder = document.createElement('div');
        placeholder.className = 'img-placeholder';
        placeholder.textContent = 'Image placeholder';
        img.replaceWith(placeholder);
      });

      const previewMarkup = previewRoot.innerHTML;
      const previewFrame = document.createElement('iframe');
      previewFrame.title = 'HTML render preview';
      previewFrame.srcdoc = `<!doctype html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            :root { color-scheme: light; }
            * { box-sizing: border-box; }
            body {
              margin: 0;
              padding: 16px;
              font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
              line-height: 1.5;
              color: #0f172a;
              background: #ffffff;
            }
            img { max-width: 100%; height: auto; display: block; }
            .img-placeholder {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              min-width: 140px;
              min-height: 90px;
              padding: 12px;
              border: 1px dashed rgba(37, 99, 235, 0.45);
              border-radius: 12px;
              color: #64748b;
              background: rgba(37, 99, 235, 0.08);
              font-size: 0.92rem;
              text-align: center;
            }
            .tag-item, .badge {
              display: inline-block;
            }
          </style>
        </head>
        <body>${previewMarkup}</body>
        </html>`;
      preview.appendChild(previewFrame);
      preview.hidden = true;

      codeElement.classList.add('code-view');
      codeElement.parentNode?.insertBefore(shell, codeElement);
      shell.appendChild(toolbar);
      shell.appendChild(codeElement);
      shell.appendChild(preview);

      toolbar.querySelectorAll('.view-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          toolbar.querySelectorAll('.view-btn').forEach((button) => button.classList.remove('active'));
          btn.classList.add('active');

          if ((btn as HTMLButtonElement).dataset.view === 'preview') {
            codeElement.hidden = true;
            preview.hidden = false;
            preview.classList.add('active');
          } else {
            codeElement.hidden = false;
            preview.hidden = true;
            preview.classList.remove('active');
          }
        });
      });
    });

    root.querySelectorAll('pre').forEach((pre) => {
      const code = document.createElement('code');
      code.className = 'language-html';
      code.textContent = pre.textContent;
      pre.innerHTML = '';
      pre.appendChild(code);
    });

    const hljs = (window as Window & { hljs?: { highlightAll: () => void } }).hljs;

    hljs?.highlightAll();
  }, []);

  return (
    <div ref={rootRef} className="html-cheatsheet-root">
      <style>{styles}</style>
      <style>{`
            .html-cheatsheet-root {
              width: 100%;
              min-width: 0;
              overflow-x: hidden;
            }

            .html-cheatsheet-root * {
              box-sizing: border-box;
            }

            .html-cheatsheet-root .container {
              width: min(100%, 1100px);
              padding-inline: clamp(12px, 3vw, 24px);
              gap: clamp(14px, 2.5vw, 24px);
            }

            .html-cheatsheet-root .container > * {
              min-width: 0;
            }

            .html-cheatsheet-root .hero,
            .html-cheatsheet-root .section,
            .html-cheatsheet-root footer {
              max-width: 100%;
            }

            .html-cheatsheet-root .section,
            .html-cheatsheet-root .hero,
            .html-cheatsheet-root footer {
              min-width: 0;
            }

            .html-cheatsheet-root .section {
              padding: clamp(16px, 3vw, 24px);
              overflow-x: hidden;
            }

            .html-cheatsheet-root .hero-text,
            .html-cheatsheet-root .simple-note,
            .html-cheatsheet-root .section p,
            .html-cheatsheet-root .section li,
            .html-cheatsheet-root .section td,
            .html-cheatsheet-root .section th {
              overflow-wrap: anywhere;
              word-break: break-word;
            }

            .html-cheatsheet-root .section table {
              display: block;
              width: 100%;
              max-width: 100%;
              overflow-x: auto;
              -webkit-overflow-scrolling: touch;
            }

            .html-cheatsheet-root .section img,
            .html-cheatsheet-root .section iframe,
            .html-cheatsheet-root .section video,
            .html-cheatsheet-root .section audio {
              max-width: 100%;
            }

            .html-cheatsheet-root .code {
              max-width: 100%;
              overflow-x: auto;
              display: inline-block;
              width: 100%;
              vertical-align: top;
            }

            .html-cheatsheet-root .code[hidden] {
              display: none !important;
            }

            .html-cheatsheet-root .code pre,
            .html-cheatsheet-root .code code {
              min-width: max-content;
            }

            .html-cheatsheet-root .code pre code.hljs,
            .html-cheatsheet-root .code pre code.hljs * {
              background: transparent !important;
            }

            .html-cheatsheet-root .code pre {
              margin: 0;
              white-space: pre;
              word-break: normal;
            }

            .html-cheatsheet-root .example-shell {
              display: inline-block;
              width: 100%;
              gap: 12px;
            }

            .html-cheatsheet-root .example-toolbar {
              display: inline-flex;
              gap: 8px;
            }

            .html-cheatsheet-root .view-btn {
              min-height: 40px;
            }

            .html-cheatsheet-root .render-preview {
              min-width: 0;
              max-width: 100%;
              display: none;
            }

            .html-cheatsheet-root .render-preview[hidden] {
              display: none !important;
            }

            .html-cheatsheet-root .render-preview.active {
              display: inline-block;
              width: 100%;
              vertical-align: top;
            }

            .html-cheatsheet-root .render-preview > * {
              max-width: 100%;
            }

            .html-cheatsheet-root .render-preview iframe {
              width: 100%;
              min-height: 280px;
            }

            .html-cheatsheet-root .render-preview .img-placeholder {
              max-width: 100%;
            }

            .html-cheatsheet-root .tag-category,
            .html-cheatsheet-root .hero-badges,
            .html-cheatsheet-root .example-toolbar {
              flex-wrap: wrap;
            }
          `}</style>
      {parse(bodyMarkup)}
    </div>
  );
}