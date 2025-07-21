'use client';
import { JSX, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './blogs.module.scss';

type Blog = {
  id: number;
  title: string;
  content: JSX.Element;
};

export default function Blogs() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const blogHeaderRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const toggleExpand = (id: number) => {
    if (expandedId === id) {
      setExpandedId(null);
      return;
    }

    if (expandedId !== null) {
      setExpandedId(null);

      setTimeout(() => {
        setExpandedId(id);
        const el = blogHeaderRefs.current[id];
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 400);
    } else {
      setExpandedId(id);
      const el = blogHeaderRefs.current[id];
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const blogs: Blog[] = [
    {
      id: 1,
      title: 'Dynamic Tables with FormArrays in Angular',
      content: (
        <>
          <p>
            <strong>Introduction</strong>
          </p>
          <p>
            In modern web development, creating dynamic and responsive user interfaces is crucial
            for enhancing user experience. Angular, a powerful framework for building single page
            applications, offers robust tools to manage forms and user inputs effectively. One such
            feature is <code>FormArray</code>, which allows developers to create dynamic forms with
            multiple rows of input fields—ideal for scenarios like managing lists of items, user
            entries, or any repetitive data structures. In this article, we will explore how the
            implementation of <code>FormArray</code> in Angular creates dynamic rows in tables.
          </p>
          <Image src="/assets/table1.png" alt="" width={500} height={400} /> {'  '}
          <Image src="/assets/table2.png" alt="" width={500} height={400} />
          <p>
            <strong>The requirement</strong>
          </p>
          <p>
            Our application includes a dialog interface for creating an attending list for events.
            This dialog requires inputs for the attending list's ‘Name’ and ‘Description’. Beyond
            these fields, we needed to add an editable table where users can choose and define
            attributes, which will appear in the attending list as fields to be completed by each
            attendee. In this table, the user should be able to dynamically add, edit, and remove
            rows, with each row representing a customizable attribute such as Attending, Kids, Plus
            One, etc.<br></br>
            <Image src="/assets/tablefinal.png" alt="" width={500} height={400} /> {'  '}
          </p>
          <p>
            <strong>How was implemented</strong>
          </p>
          <ol>
            <li>
              For start, we declared and initialized a FormArray inside a FormGroup, which will be
              linked to the table rows. This allows us to dynamically add and remove rows from the
              table, with each row corresponding to a form group in the FormArray.
              <pre>
                <code>
                  {' '}
                  {`this.attendingListForm = new Formgroup({
      Name: new FormControl('', [Validators.required, noWhitespaceValidator]),
      Description: new FormControl('', [Validators.maxLength(500), noWhitespaceValidator]),
      Attributes: new FormArrauy([]),
  });`}{' '}
                </code>
              </pre>
            </li>
            <li>
              We implemented a method <code>loadAttributes</code> which is called after the
              attributes data is fetched from the backend. This method iterates over each record
              from the backend, creates a new FormGroup for each, and then pushes it into the
              Attributes FormArray.
            </li>
            <li>
              Now that Attributes FormArray is updated with the backend data, we bind the table’s
              data source to the FormArray so that the HTML table is directly linked to the form,
              and any changes made to the form automatically update the data source.
              <pre>
                <code> {`this.dataSource.data = this.attributes.value;`} </code>
              </pre>
            </li>
            <li>
              In the HTML, for each column in the table, the formGroupName directive is applied,
              with the index of the form group as its value:
              <pre>
                <code> {`<div [formGroupName]="element.Index" id="new-attribute">`} </code>
              </pre>{' '}
              By giving the index as value, the input field will be linked to its corresponding form
              group in the FormArray.{' '}
            </li>
            <li>
              We used conditional rendering for each column to either display an input field or show
              the record’s value as plain text, depending on the <code>isEdit</code> property of
              each attribute. If the <code>isEdit</code> property is <code>true</code>, the input
              fields are displayed. If
              <code>isEdit</code> is <code>false</code>, the record’s values are displayed as plain
              text, preventing any changes.{' '}
            </li>
            <li>
              {' '}
              Create new row.<br></br> When the user clicks Add button, an empty new FormGroup is
              created and added to the FormArray. This new form group is initialized with the{' '}
              <code>isEdit</code> property set to ‘true’, which means that the input fields will be
              displayed, allowing the user to fill in the necessary data. <br></br>
              <Image src="/assets/createrow.png" alt="" width={500} height={400} /> <br></br>
              After entering the data, the user has two options: to initiate the creation of a new
              item and another to discard any changes made. If the user decides not to keep the new
              row, they can click the ‘Remove’ icon. This action triggers the{' '}
              <code>removeAttribute</code>
              method, which removes the corresponding form group from the Attributes FormArray,
              using <code>removeAt()</code> method provided by the FormArray. This method requires
              the index of the form group as a parameter.
              <pre>
                <br></br>
                <code> {`this.attributes.removeAt(row.Index!);`} </code>
              </pre>{' '}
              If the user clicks on ‘Save’ icon, the <code>saveAttribute</code> method is called. In
              this case, the form group remains part of the FormArray and the data it is send to the
              backend to be saved in the database.
            </li>
            <li>
              {' '}
              Edit row.<br></br> When the user clicks the ‘Edit’ icon, the <code>isEdit</code>{' '}
              property for that row is set to <code>true</code> and the row becomes editable. After
              making the changes, the user has two options: save or discard the changes.<br></br>
              <Image src="/assets/editrow.png" alt="" width={500} height={400} /> <br></br>
            </li>
            <li>
              Delete row. <br></br>When the user clicks the ‘Delete’ icon, the{' '}
              <code>deleteAttribute</code> method is called. This method removes the corresponding
              form group from the Attributes FormArray using the index of the row and it also
              triggers the logic to delete the record from the database. <br></br>For each one of
              the actions - create, remove, edit, delete - the data source is updated with the
              values from the FormArray to ensure that the displayed information is synchronized
              with the form.{' '}
            </li>
          </ol>
          <p>
            <strong>Conclusion</strong>
          </p>
          <p>
            In conclusion, we chose to use <code>FormArray</code> for this requirement because it
            allows us to dynamically manage a table of attributes. By leveraging{' '}
            <code>FormArray</code>, we can easily add, remove, or manipulate form controls
            dynamically, ensuring that the application remains flexible and responsive to user
            actions.
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
            <strong>Introduction</strong>
          </p>
          <p>
            This project uses Electron in combination with Vite and React to turn a modern web app
            into a cross-platform desktop application.
          </p>

          <p>
            <strong>How Electron Works </strong>
          </p>
          <p>
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
            <strong>In this project</strong>
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
          <u>What it does:</u>
          <ul>
            <li>Creates a window and loads your index.html from Vite.</li>
            <li>The icon appears in the window title bar and taskbar.</li>
            <li>contextIsolation: true: Security feature recommended by Electron.</li>
          </ul>
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
          <u>What it does:</u>
          <ul>
            <li>
              Compiles your Electron source files (e.g., main.ts) to JavaScript in the dist
              electron/ folder.
            </li>
            <li>Ensures modern JS output and correct module handling.</li>
            <li>include: Points to your Electron source directory.</li>
          </ul>
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
          <u>What it does:</u>
          <ul>
            <li>files: Includes built frontend and Electron files.</li>
            <li>main: Defines the Electron entry point.</li>
            <li> win.icon: Custom app icon for the Windows .exe.</li>
            <li>target: nsis: Generates a Windows installer.</li>
          </ul>
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
            <strong>Notes</strong>
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
      title: 'Rich Text Editor – Angular Editor Kolkov',
      content: (
        <>
          <p>
            <strong>Introduction</strong>
          </p>
          <p>
            In the evolving landscape of web development, rich text editors play a vital role in
            content creation. <strong>Angular Editor Kolkov</strong> is a powerful, Angular-specific
            tool offering a clean UI and strong integration features. With its robust features, user
            friendly interface, and seamless integration capabilities, Kolkov offers developers an
            efficient way to implement rich text editing functionality.
          </p>
          <p>
            <strong>Requirement</strong>{' '}
          </p>
          <p>
            In this application we have a dialog interface for technical questions. This dialog
            includes mandatory inputs for the question title and description and some optional
            inputs for the technology in question and attachments. For the ‘Description’ input we
            had to make a rich text editor where the user could add images, format the text and so
            on.
          </p>
          <Image src="/assets/richtexteditor.jpeg" alt="" width={400} height={300} />
          <p>
            <strong>Implementation Steps</strong>
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
            <strong>Conclusion</strong>
          </p>
          <p>
            In conclusion, integrating Angular Editor Kolkov into an Angular application
            significantly enhances the user experience by providing a rich text editor capable of
            handling complex content such as images and formatted text. The implementation process,
            from installation to configuration and customization, ensures a smooth and efficient way
            to handle dynamic content creation, especially in cases where rich formatting and media
            embedding are essential, as demonstrated with the technical question dialog in this
            case. The solution of separating images as attachments while maintaining the ability to
            display them within the text is a practical approach to managing large content, ensuring
            scalability, and optimizing data transfer.
          </p>
        </>
      ),
    },
    {
      id: 4,
      title: 'Unit Testing in Angular',
      content: (
        <div>
          <p>
            <strong>Introduction to Angular and the Importance of Unit Testing</strong>
          </p>
          <p>
            Angular is a powerful framework used to build modern, feature-rich web applications. It
            uses TypeScript, an enhanced version of JavaScript that introduces static typing and
            other tools to make code more robust and maintainable.
          </p>
          <p>
            Unit testing plays a key role in Angular development. It focuses on testing individual
            parts of an application—such as components, services, or functions—to confirm they
            behave as expected. This helps developers catch bugs early, ensures code reliability,
            and protects existing features when updates are made. Although it requires some initial
            setup, unit testing ultimately reduces manual testing and makes long-term maintenance
            more efficient.
          </p>
          <p>
            <strong>Setting Up the Testing Environment</strong>
          </p>
          <p>
            To write and run tests in Angular, two key tools are commonly used: Jasmine and Karma.
          </p>
          <ol>
            <li>
              <u>Jasmine</u> is a testing framework that offers the tools and structure needed to
              write unit tests. It helps organize test suites using <code>describe</code> blocks and
              defines specific test scenarios with <code>it</code> blocks. Its clear and concise
              syntax allows developers to easily create and read test cases, making the intent of
              each test obvious.
            </li>
            <li>
              <u>Karma</u> is a test runner created by the Angular team that automates the execution
              of tests whenever the codebase is modified. This automation removes the need for
              developers to manually rerun tests after each change. The testing behavior can be
              customized using the <code>karma.conf.js</code> file, where options like target
              browsers, file inclusions/exclusions, and other settings can be defined to match the
              project's requirements.
            </li>
          </ol>
          <p>
            When starting a new Angular project, the Angular CLI automatically includes Jasmine and
            Karma as part of the default testing setup. For existing projects, running{' '}
            <code>ng add @angular/cli</code> installs any missing testing dependencies, ensuring the
            project is properly equipped for unit testing.
          </p>
          <p>
            After the initial setup, developers can further customize the environment through the{' '}
            <code>karma.conf.js</code> file. Once everything is configured, running{' '}
            <code>ng test</code> will start Karma, execute the tests, and show the results in real
            time.
          </p>
          <p>
            <strong>Structure of an Angular Unit Test File</strong>
          </p>
          <p>
            A typical test file in Angular is structured into several key sections, each serving a
            specific purpose in defining and organizing the tests:
          </p>
          <ol>
            <li>
              <strong>TestBed</strong> is Angular’s primary utility for configuring and initializing
              the testing environment. It sets up everything required to test a specific component
              or service by supplying the needed dependencies. This is done using the
              <code>TestBed.configureTestingModule</code> method, where you define the components,
              services, and modules involved in the test. This setup is crucial because components
              and services often rely on other parts of the application to function properly.
              <pre>
                <code>
                  {' '}
                  {` await Testbed.configureTestingModule({
    imports: [MatmenuModule, MatDatepickerModule, SharedTestingModule],
    declarations: [ActionsBarComponent, HasAuthorityDirective],
    providers: [DatePipe],
  }).compileComponents();`}{' '}
                </code>
              </pre>
              Within this configuration, the imports, declarations, and providers sections are used
              to include any necessary modules, components, or services that the tested component
              depends on. This ensures the testing environment closely mirrors the actual
              application setup and allows the tests to run smoothly.
            </li>
            <li>
              <strong>beforeEach/afterEach</strong> – Hooks for setting up and tearing down test
              state before and after each test case.
            </li>
            <li>
              <strong>Fixture</strong> – is a testing utility in Angular that provides a controlled
              environment for testing a component. It gives direct access to both the component’s
              instance and its rendered DOM, allowing interaction with and inspection of the
              component’s internal state and template. The fixture also handles change detection,
              ensuring the component updates in response to data changes—just like it would in a
              live Angular application. This makes it easier to test dynamic behavior and user
              interactions in real time.
              <pre>
                <code>
                  {' '}
                  {` beforeEach(() => {
    fixture = TextBed.createComponent(FeedbackDialogComponent);
    component = fixture.componentInstance
    fixture.detectChanges();
  });`}{' '}
                </code>
              </pre>
            </li>
            <li>
              <strong>It block</strong>This is where individual test cases are written. Each{' '}
              <code>it</code>
              block contains a specific scenario or behavior to test, typically including one or
              more expectations that validate whether the code works as intended. The description
              passed to the <code>it</code> function should clearly communicate what the test is
              verifying, making it easy to understand the purpose of the test at a glance.
              <pre>
                <code>
                  {' '}
                  {` it('should create', () => {
    expect(component).toBeTruthy();
  });`}{' '}
                </code>
              </pre>
              In the following example, the <code>it</code> block verifies that the component has
              been successfully created by checking if it is truthy—meaning it exists and has been
              properly initialized:
              <ul>
                <br></br>
                <li>toBe: checks for strict equality (byreference). </li>
                <li>toEqual: checks for deep equality (by content).</li>
                <li>
                  toBeTruthy/toBeFalsy: Verifies if a value is true or false, such as if it exists
                  or is null..
                </li>
                <li>toContain: Checks if an array or string contains a specific value.</li>
              </ul>
            </li>
            <li>
              <strong>Spies</strong> are utilities used in testing to monitor and track interactions
              with functions or methods. They’re especially helpful when testing components that
              rely on services or external functions. With spies, developers can verify whether a
              specific function was called, how many times it was invoked, and what arguments were
              passed to it. This allows for precise testing of interactions and behaviors without
              relying on the actual implementation of the function.
              <pre>
                <code>
                  {' '}
                  {` it('should call "read" method with the corect parameters', () => {
    const questionId = '1';
    const resourceUrl = 'Question';

    service.readAnswerByQuestionId(questionId).subscribe();
    expect(readSpy).toHaveBeenCalledWith(resourceUrl, questionId);
  });`}{' '}
                </code>
              </pre>
              In the example below, the test checks whether the <code>readAnswerByQuestionId</code>{' '}
              method calls the read function with the correct parameters: The line{' '}
              <code>expect(readSpy).toHaveBeenCalledWith(...)</code> uses a spy to verify that the
              read method was called with the expected arguments. If the method is called correctly,
              the test will pass; if not, it will fail—indicating that the component or service
              isn't behaving as intended.
            </li>
          </ol>
          <p>
            <strong>Conclusion</strong>
          </p>
          <p>
            Adopting proper unit testing practices in Angular ensures that components, services, and
            modules behave as intended. Well-written tests provide a safety net, allowing developers
            to maintain and scale their applications with confidence. By identifying issues early
            and promoting reliable code, unit testing plays a vital role in building stable and
            maintainable Angular projects.
          </p>
        </div>
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
              <div
                className={styles.blogHeader}
                ref={(el) => {
                  blogHeaderRefs.current[blog.id] = el;
                }}
                onClick={() => toggleExpand(blog.id)}
              >
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
                <br />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
