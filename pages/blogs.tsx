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
            With its robust features, user friendly interface, and seamless integration
            capabilities, Kolkov offers developers an efficient way to implement rich text editing
            functionality.
          </p>
          <p>
            <strong>Requirement:</strong> In this application we have a dialog interface for
            technical questions. This dialog includes mandatory inputs for the question title and
            description and some optional inputs for the technology in question and attachments. For
            the ‘Description’ input we had to make a rich text editor where the user could add
            images, format the text and so on.
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
              After a successful installation, we integrated the editor into the html file. One
              important property is the variable <code>editorConfig</code> from{' '}
              <code>[config]</code>.
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
            <li>
              Next, we defined the variable within the TypeScript file with values for height,
              placeholder, hidden buttons and so on.
            </li>
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
              Our primary focus was the feature that allows images inside the text. In this editor
              the image is added as a clob inside the text. Since the text containing clobs can be
              too large to send to back end we created a way to save the images as separate
              attachments. Once an image is saved as an attachment, the clob in the text is replaced
              with a reference to it (in our case <code>image-1730207134000.jpeg</code>, where the
              number is the time zone) and then sent to back end. On read, we get the attachments
              and map them to replace the references in text and display the images through the
              text.
            </li>
            <li>
              Most of the work is carried out by the function that saves the technical question. We
              started by extracting the images from the description text using a regex. They are
              saved in variable
              <code>imagesDescription</code> and the regex used is saved in
              <code>extractImageContent</code>.
            </li>
            <pre>
              <code>
                {`this.imageDescription = questionData.Description.match(extractImagContent);`}
              </code>
            </pre>

            <li>
              After that, we call <code>getImageOrVideo</code> function for both create and update
              cases. This retrieves the images with the html tags <code>{'<img src=…>'}</code> not
              just the clob and filters out any video paths, as the editor supports videos that do
              not require any changes.
            </li>
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
            <li>
              {' '}
              For the create scenario, we just iterate through the images extracted and create the
              attachments. For each image we replace it in the description with an image icon and
              the file name.{' '}
            </li>
            <pre>
              <code>
                {`questionData.Description = questionData.Description.replace(
    image,
    '<img src=\${image_icon_path}/>(' + file.Name + ')'
);`}
              </code>
            </pre>
            <li>
              For the update we must do more actions. After <code>getImageOrVideo</code> function,
              we replace the images extracted with its references for the before description, just
              as we do for the create case. Next, we create the new attachments needed from the
              description and we update the current description to replace all the clobs. This way
              we can safely send to back end.{' '}
            </li>
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
            <li>
              {' '}
              In case the description is not updated, only the other fields, we still need to
              replace the clobs with the corresponding references to ensure the data can be properly
              sent to the backend.
            </li>
            <li>
              {' '}
              For when we need to display the description, we read it from the back end and when we
              retrieve the attachments, we replace the reference with its attachment clob. Since we
              allow users to upload separate attachments for a question, we added a Boolean field
              ‘ImageDescription’ to distinguish between those files and the images from the
              description.{' '}
            </li>
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
              Then, to show the description in the format made by the user (with bold, italics,
              colored text, etc.) we added the property <code>[innerHTML]</code> to the {'<div>'}{' '}
              element that displays the saved description. This ensures the text appears as
              intended, with all user-applied styles intact.
            </li>
            <pre>
              <code>
                {`<div
  [innerHtml]="qiestion.Description"
  class="question-decription"
`}
              </code>
            </pre>
          </ol>
          <p>
            <strong>Conclusion:</strong> In conclusion, integrating Angular Editor Kolkov into an
            Angular application significantly enhances the user experience by providing a rich text
            editor capable of handling complex content such as images and formatted text. The
            implementation process, from installation to configuration and customization, ensures a
            smooth and efficient way to handle dynamic content creation, especially in cases where
            rich formatting and media embedding are essential, as demonstrated with the technical
            question dialog in this case. The solution of separating images as attachments while
            maintaining the ability to display them within the text is a practical approach to
            managing large content, ensuring scalability, and optimizing data transfer.
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
            <strong>How Electron Works: </strong>
            Electron is a framework that allows you to create desktop applications using web
            technologies like HTML, CSS, and JavaScript. It has two main processes:
          </p>
          <ol>
            <li>
              <u>Main Process</u>: Runs the Electron app, creates windows, handles OS-level
              interactions.
            </li>
            <li>
              <u>Renderer Process</u>: Runs your frontend (the React app in this case), similar to a
              browser tab.
            </li>
          </ol>

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
          <br></br>
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
              <code>base: './'</code>:Ensures relative paths in index.html, important for Electron
              where the app isn’t served from a web server.
            </li>
            <li>
              <code>plugins: [react()]</code>: Adds React support to Vite.
            </li>
            <li>
              <code>build.outDir</code>: Tells Vite to place the production build in the dist folder
              (used by Electron to load the UI).
            </li>
          </ul>

          <p>
            <strong>Electron Main Process (electron/main.ts)</strong>
          </p>
          <br></br>
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
            <u>What it does:</u>
            <ul>
              <li>Creates a window and loads your index.html from Vite.</li>
              <li>The icon appears in the window title bar and taskbar.</li>
              <li>contextIsolation: true: Security feature recommended by Electron.</li>
            </ul>
          </p>
          <p>
            <strong>TypeScript Config (tsconfig.electron.json)</strong>
          </p>
          <br></br>
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
            <u>What it does:</u>
            <ul>
              <li>
                Compiles your Electron source files (e.g., main.ts) to JavaScript in the dist
                electron/ folder.
              </li>
              <li>Ensures modern JS output and correct module handling.</li>
              <li>include: Points to your Electron source directory.</li>
            </ul>
          </p>
          <p>
            <strong>Electron Builder Config (in package.json)</strong>
          </p>
          <br></br>
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
            <u>What it does:</u>
            <ul>
              <li>files: Includes built frontend and Electron files.</li>
              <li>main: Defines the Electron entry point.</li>
              <li> win.icon: Custom app icon for the Windows .exe.</li>
              <li>target: nsis: Generates a Windows installer.</li>
            </ul>
          </p>
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
          <br></br>
          <ul>
            <li>The icon should be 256x256 or larger for proper Windows usage.</li>
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
