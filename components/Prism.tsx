import { Highlight, Prism, Language } from 'prism-react-renderer';
import { useEffect, useState } from 'react';

import '../styles/prism.css';

type Props = {
  value: { fileName: string; language: string; text: string };
};

async function initPrismAsync(language: Language) {
  (typeof global !== 'undefined' ? global : window).Prism ||= Prism;
  switch (language) {
    case 'javascript':
      await import('prismjs/components/prism-javascript' as Language);
      break;
    case 'css':
      await import('prismjs/components/prism-css' as Language);
      break;
    case 'bash':
      await import('prismjs/components/prism-bash' as Language);
      break;
    case 'docker':
      await import('prismjs/components/prism-docker' as Language);
      break;
    case 'git':
      await import('prismjs/components/prism-git' as Language);
      break;
    case 'http':
      await import('prismjs/components/prism-http' as Language);
      break;
    case 'java':
      await import('prismjs/components/prism-java' as Language);
      break;
    case 'json':
      await import('prismjs/components/prism-json' as Language);
      break;
    case 'ruby':
      await import('prismjs/components/prism-ruby' as Language);
      break;
    case 'sql':
      await import('prismjs/components/prism-sql' as Language);
      break;
    case 'typescript':
      await import('prismjs/components/prism-typescript' as Language);
      break;
    case 'diff':
      await import('prismjs/components/prism-diff' as Language);
      break;
  }
}

export function CodeComponent({ value: { text, language } }: Props) {
  const [, setHasPrismLoaded] = useState(false);

  useEffect(() => {
    async function runAsync() {
      try {
        await initPrismAsync(language);
      } catch (error) {
        console.error(error);
      } finally {
        setHasPrismLoaded(true); // trigger a re-render to highlight the code
      }
    }

    void runAsync();
  }, [language]);

  return (
    <Highlight theme={{ styles: [], plain: {} }} code={text} language={language}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre style={style} className="my-2 grid">
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
