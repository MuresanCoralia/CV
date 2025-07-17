'use client';

import { JSX, useState } from 'react';
import Image from 'next/image';
import styles from './blogs.module.scss';

type Blog = {
  id: number;
  title: string;
  content: JSX.Element;
};

export default function Blogs() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const blogs: Blog[] = [
    {
      id: 1,
      title: 'Rich Text Editor – Angular Editor Kolkov',
      content: (
        <>
          <p>
            <strong>Introduction:</strong> In the evolving landscape of web development, rich text
            editors play a vital role in content creation. <strong>Angular Editor Kolkov</strong> is
            a powerful, Angular-specific tool offering a clean UI and strong integration features.
          </p>
          <p>
            <strong>Requirement:</strong> In our application, we needed a rich text editor in a
            dialog interface for technical questions. The goal was to allow formatted text and
            images within the ‘Description’ field.
          </p>
          <Image src="/assets/richtexteditor.jpeg" alt="" width={400} height={300} />
          <p>
            <strong>Implementation Steps:</strong>
          </p>
          <ol>
            <li>
              Install with <code>npm install @kolkov/angular-editor --save</code>
            </li>
            <li>
              Bind config using <code>[config]</code> pointing to an <code>editorConfig</code>
            </li>
            <pre>
              <code>
                {`<angular-editor>
  formControlName="Description"
  [config]="editorConfig"
  [ngClass]="{
    'error-editor':
      questionForm.get('Description')?.touched &&
      questionForm.get('Description')?.hasError('required')
  }">
</angular-editor>`}
              </code>
            </pre>
            <li>Define config with height, placeholders, and hidden buttons</li>
            <pre>
              <code>
                {`editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 200px,
    minHeight: 100px,
    placeholder: 'Description *',
    translate: no,
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [['backgroundColor', 'toggleEditorMode']]
}`}
              </code>
            </pre>
            <li>
              Extract images from clob and replace with references (e.g. <code>image-1730...</code>)
            </li>
            <li>
              Use regex <code>extractImageContent</code> to get embedded images
            </li>
            <li>
              <code>getImageOrVideo()</code> filters videos and extracts images
              <pre>
                <code>
                  {`private getImageOrVideo(description: string, regex: any): void {
    this.images = description.match(regex);
    if (description.includes('<a href=')) {
      this.images = this.images?.filter((file: any) => !file.includes('http'));
      this.imagesDescription = this.imagesDescription?.filter(
        (file: any) => !file.includes('http')
      );
    }
  }`}
                </code>
              </pre>
            </li>
            <li>In "create", save images and replace HTML with filename references</li>
            <pre>
              <code>
                {`questionData.Description = questionData.Description.replace(
    image,
    '<img src=\${image_icon_path}/>(' + file.Name + ')'
);`}
              </code>
            </pre>
            <li>In "update", same logic with handling of previously stored clobs</li>
            <pre>
              <code>
                {`this.questionFile?.forEach(file => {
  questionData.Description = questionData.Description.replace(
    \`<img src="\${file.CLOB}">\`,
    \`<img src='\${image_icon_path}'/> (\${file.Name})\`
  );
});`}
              </code>
            </pre>
            <li>Even if description isn’t changed, clobs must be replaced</li>
            <li>On display, fetch and inject image clobs into references</li>
            <pre>
              <code>
                {`if (attachment.ImageDescriptio)
  this.question.Description = this.question.Description.replace(
    \`<img src="\${image_icon_path}"/>(\${attachment.Name})\`,
    \`<img src='\${attachment.CLOB}'/>\`
  );
`}
              </code>
            </pre>
            <li>
              Use <code>[innerHTML]</code> to preserve formatting
            </li>
          </ol>
          <p>
            <strong>Conclusion:</strong> This approach keeps user formatting, stores media
            efficiently, and ensures performance and backend compatibility.
          </p>
        </>
      ),
    },
    {
      id: 2,
      title: 'Electron Integration with Vite + React',
      content: (
        <>
          <p>
            <strong>Introduction:</strong> This project uses Electron in combination with Vite and
            React to turn a modern web app into a cross-platform desktop application.
          </p>

          <p>
            <strong>How Electron Works</strong>
          </p>
          <ul>
            <li>
              <strong>Main Process:</strong> Runs the Electron app, creates windows, handles
              OS-level interactions.
            </li>
            <li>
              <strong>Renderer Process:</strong> Runs your frontend (the React app in this case),
              similar to a browser tab.
            </li>
          </ul>

          <p>
            <strong>In this project:</strong>
          </p>
          <ul>
            <li>The React app is bundled with Vite.</li>
            <li>
              Electron loads the final <code>dist/index.html</code> into a desktop window.
            </li>
            <li>
              We use <code>electron-builder</code> to package the app and generate an{' '}
              <code>.exe</code>.
            </li>
          </ul>

          <p>
            <strong>Vite + React Setup (vite.config.ts)</strong>
          </p>
          <pre>
            <code>{`import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
});`}</code>
          </pre>
          <ul>
            <li>
              <code>base: './'</code>: Ensures relative paths in index.html for Electron.
            </li>
            <li>
              <code>plugins: [react()]</code>: Adds React support.
            </li>
            <li>
              <code>build.outDir</code>: Output folder used by Electron.
            </li>
          </ul>

          <p>
            <strong>Electron Main Process (electron/main.ts)</strong>
          </p>
          <pre>
            <code>{`import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    icon: path.join(__dirname, '../public/icon.ico'),
    webPreferences: {
      contextIsolation: true,
    },
  });

  win.loadFile(path.join(__dirname, '../dist/index.html'));
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});`}</code>
          </pre>

          <p>
            <strong>TypeScript Config (tsconfig.electron.json)</strong>
          </p>
          <pre>
            <code>{`{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ES2020",
    "moduleResolution": "node",
    "outDir": "dist-electron",
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["electron/**/*"]
}`}</code>
          </pre>

          <p>
            <strong>Electron Builder Config (in package.json)</strong>
          </p>
          <pre>
            <code>{`"build": {
  "appId": "com.crossway.viewer",
  "productName": "Crossway Diagram Viewer",
  "files": [
    "dist/**/*",
    "dist-electron/**/*"
  ],
  "extraMetadata": {
    "main": "dist-electron/main.js"
  },
  "win": {
    "target": "nsis",
    "icon": "./public/icon.ico"
  }
}`}</code>
          </pre>

          <p>
            <strong>Usage</strong>
          </p>
          <ol>
            <li>
              Run <code>npm install</code>
            </li>
            <li>
              Run <code>npm run electron:dev</code> to build and launch the app in dev mode
            </li>
            <li>
              Run <code>npm run make</code> to generate the installable .exe
            </li>
          </ol>

          <p>
            <strong>Notes:</strong>
          </p>
          <ul>
            <li>The icon should be 256x256 or larger for proper Windows usage.</li>
            <li>Final output size (~190MB) is normal due to Chromium packaging.</li>
            <li>
              <code>dist/</code> and <code>dist-electron/</code> are generated during the build.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: 3,
      title: 'FormArrays in Angular',
      content: (
        <p>
          <strong>Coming soon:</strong> Deep dive into dynamic form arrays in Angular, validation,
          and nested form group management.
        </p>
      ),
    },
    {
      id: 4,
      title: 'Unit Testing in Angular',
      content: (
        <p>
          <strong>Coming soon:</strong> Best practices for testing services, components, and
          reactive forms in Angular using Jasmine and Karma.
        </p>
      ),
    },
  ];

  return (
    <main>
      <div className={styles.imageContainer}>
        <div className={styles.overlayContent}>
          <h1 className={styles.pageTitle}>My Blogs:</h1>
          <h2 className={styles.pageSubtitle}>Highlights of my work</h2>

          {blogs.map((blog) => (
            <div
              key={blog.id}
              className={`${styles.blogEntry} ${expandedId === blog.id ? styles.expanded : ''}`}
            >
              <div className={styles.blogHeader} onClick={() => toggleExpand(blog.id)}>
                <h3>{blog.title}</h3>
                <span>{expandedId === blog.id ? '−' : '+'}</span>
              </div>

              <div
                className={styles.blogContent}
                style={{
                  maxHeight: expandedId === blog.id ? '5000px' : '0',
                  overflow: 'hidden',
                }}
              >
                {blog.content}
                <br></br>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
