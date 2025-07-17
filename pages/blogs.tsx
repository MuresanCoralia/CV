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
          <Image src="/assets/richtexteditor1.jpeg" alt="" width={400} height={300} />
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
            <Image src="/assets/richtexteditor2.jpeg" alt="" width={600} height={300} />
            <li>Define config with height, placeholders, and hidden buttons</li>
            <Image src="/assets/richtexteditor3.jpeg" alt="" width={600} height={300} />
            <li>
              Extract images from clob and replace with references (e.g. <code>image-1730...</code>)
            </li>
            <li>
              Use regex <code>extractImageContent</code> to get embedded images
            </li>
            <li>
              <code>getImageOrVideo()</code> filters videos and extracts images
              <Image src="/assets/richtexteditor4.jpeg" alt="" width={800} height={300} />
            </li>
            <li>In "create", save images and replace HTML with filename references</li>
            <Image src="/assets/richtexteditor5.jpeg" alt="" width={600} height={150} />
            <li>In "update", same logic with handling of previously stored clobs</li>
            <Image src="/assets/richtexteditor6.jpeg" alt="" width={600} height={150} />
            <li>Even if description isn’t changed, clobs must be replaced</li>
            <li>On display, fetch and inject image clobs into references</li>
            <Image src="/assets/richtexteditor7.jpeg" alt="" width={600} height={150} />
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
      title: 'FormArrays in Angular',
      content: (
        <p>
          <strong>Coming soon:</strong> Deep dive into dynamic form arrays in Angular, validation,
          and nested form group management.
        </p>
      ),
    },
    {
      id: 3,
      title: 'Electron Integration',
      content: (
        <p>
          <strong>Coming soon:</strong> How to integrate Angular with Electron for desktop app
          deployment using cross-platform packaging.
        </p>
      ),
    },
    {
      id: 4,
      title: 'Unit Testing Angular Apps',
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
