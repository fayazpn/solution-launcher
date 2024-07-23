import { useState } from 'react';

import { Editor } from '@monaco-editor/react';
import { Preview } from './Preview';

const initialSnippet = `
    <html>
      <head>
        <title>Hello World</title>
      </head>
      <body>
        <div id="root"></div>

        <script>
          function HelloWorld() {
            document.getElementById('root').innerHTML = '<h1 style="color: blue;">Hello, World!</h1>';
          }
          HelloWorld();
        </script>
      </body>
    </html>
`;

export const CodeEditor: React.FC<any> = () => {
  const [editorState, setEditorState] = useState(initialSnippet);

  return (
    <div className="flex flex-row h-full ">
      <Editor
        className=" min-h-[100vh]"
        language="html"
        value={editorState}
        onChange={(value) => setEditorState(value || '')}
        theme="vs-dark"
        options={{
          minimap: {
            enabled: true,
          },
          lineNumbers: 'on',
          rulers: [120],
          renderLineHighlight: 'gutter',
          fontSize: 16,
          lineHeight: 26,
          fontFamily: 'JetBrains Mono, Menlo, monospace',
          fontLigatures: true,
          'semanticHighlighting.enabled': true,
          bracketPairColorization: {
            enabled: true,
          },
          wordWrap: 'on',
          tabSize: 2,
        }}
      />
      <Preview snippet={editorState} />
    </div>
  );
};
