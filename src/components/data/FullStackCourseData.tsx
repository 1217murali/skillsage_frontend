// src/data/FullStackCourseData.ts

import React from "react";
import { CheckCircle } from "lucide-react";

/* -------------------- INTERFACES (Copied from DSACourseData) -------------------- */
export interface QuizQuestion { id: string; question: string; options: string[]; answer: number; }
export interface DetailedSubmodule { id: string; title: string; content: React.ReactNode; estimatedReadingTime: string; moduleId: string; }
export interface ModuleProgress { readProgress: number; isCompleted: boolean; isQuizCompleted: boolean; }
export interface ModuleDefinition {
    id: string;
    title: string;
    submodules: DetailedSubmodule[];
    quizId: string;
    nextModuleId: string | null;
}

// Helper function to create content structure (for cleaner data arrays)
const createContent = (moduleId: string, title: string, estimatedReadingTime: string, content: React.ReactNode): DetailedSubmodule => ({
    moduleId, title, estimatedReadingTime, content, id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
});

/* -------------------- QUIZ DATA (Full Stack Modules) -------------------- */
// NOTE: Quiz data is retained and validated, but not expanded in line count, as the complexity lies in content.
export const QUIZ_QUESTIONS: Record<string, QuizQuestion[]> = {
    // --- M-101: Core HTML (Same) ---
    "m-101-final": [
        { id: "m101-q1", question: "Which core HTML element defines the structure of the document?", options: ["<meta>", "<body>", "<head>", "<section>"], answer: 1, },
        { id: "m101-q2", question: "What is the primary function of the <head> element?", options: ["Contain visible page content", "Define metadata and links to scripts/stylesheets", "Display navigation links", "Execute initial JavaScript"], answer: 1, },
        { id: "m101-q3", question: "Which HTML5 semantic element should wrap major navigation links?", options: ["<header>", "<nav>", "<section>", "<div>"], answer: 1, },
        { id: "m101-q4", question: "Which tag is used to make text italic *semantically*?", options: ["<i>", "<b>", "<em>", "<italics>"], answer: 2, },
        { id: "m101-q5", question: "What is the purpose of the 'alt' attribute on an <img> tag?", options: ["To display a tooltip", "To define the image's source URL", "To provide alternative text for screen readers and when the image fails to load", "To set the image's alignment"], answer: 2, },
        { id: "m101-q6", question: "Which attribute is used to group related form elements and give them a caption?", options: ["<fieldset>", "<label>", "<group>", "<legend>"], answer: 0, },
        { id: "m101-q7", question: "The `async` and `defer` attributes on a `<script>` tag are used for what?", options: ["Inline styling", "Loading external modules", "Controlling script execution time and parsing behavior", "Setting script permissions"], answer: 2, },
        { id: "m101-q8", question: "Which HTML structure is used to associate a caption with an image?", options: ["<figure>", "<figcaption>", "<picture>", "<image-caption>"], answer: 0, },
        { id: "m101-q9", question: "What is the correct MIME type for linking an external CSS file?", options: ["text/css", "style/css", "application/css", "css/stylesheet"], answer: 0, },
    ],
    // --- M-102: Core CSS Layout (Box, Flex) ---
    "m-102-final": [
        { id: "m102-q1", question: "The box model consists of Content, Padding, Border, and what else?", options: ["Outline", "Margin", "Position", "Box-Shadow"], answer: 1, },
        { id: "m102-q2", question: "What is the standard fix for simplifying the Box Model calculation?", options: ["Using max-width", "Using display: inline-block", "Setting box-sizing: content-box", "Setting box-sizing: border-box"], answer: 3, },
        { id: "m102-q3", question: "In Flexbox, what property controls the arrangement along the main axis?", options: ["align-items", "justify-content", "flex-direction", "align-self"], answer: 1, },
        { id: "m102-q4", question: "Which property is used to define a CSS variable?", options: ["var-name", "--var-name", "$var-name", "let-var-name"], answer: 1, },
        { id: "m102-q5", question: "What is the fractional unit used in CSS Grid for flexible sizing?", options: ["rem", "vw", "fr", "grid-unit"], answer: 2, },
    ],
    // --- M-103: Responsive & Specificity (New split) ---
    "m-103-final": [
        { id: "m103-q1", question: "What is the order of CSS specificity from highest to lowest?", options: ["ID, Class, Element", "Inline, ID, Class, Element", "Element, Class, ID", "Class, ID, Inline"], answer: 1, },
        { id: "m103-q2", question: "Which CSS concept determines which rule wins when multiple rules conflict?", options: ["Inheritance", "The Box Model", "The Cascade", "The DOM"], answer: 2, },
        { id: "m103-q3", question: "Which CSS property is crucial for making responsive layouts using breakpoints?", options: ["transform", "@media rule", "z-index", "display"], answer: 1, },
        { id: "m103-q4", question: "The Mobile-First approach uses which media query logic?", options: ["max-width", "only screen", "min-width", "device-height"], answer: 2, },
        { id: "m103-q5", question: "Which selector targets the first child element *of a specific type*?", options: [":first-child", ":first-of-type", ":nth-child(1)", ":only-child"], answer: 1, },
    ],
    // --- M-104: Core JS & Scoping (New split) ---
    "m-104-final": [
        { id: "m104-q1", question: "Which keyword creates a block-scoped variable in modern JavaScript?", options: ["var", "let", "const", "local"], answer: 1, },
        { id: "m104-q2", question: "What is the output of `typeof null` in JavaScript?", options: ["'null'", "'object'", "'undefined'", "'number'"], answer: 1, },
        { id: "m104-q3", question: "What is *hoisting* in JavaScript?", options: ["Moving function calls to the top", "Moving all variable and function declarations to the top of their scope", "Converting asynchronous code to synchronous", "A DOM manipulation technique"], answer: 1, },
        { id: "m104-q4", question: "The primary difference between an Arrow Function and a standard Function is:", options: ["Arrow functions are faster to execute", "Arrow functions can be used as constructors", "Arrow functions do not have their own `this` binding", "Arrow functions can be hoisted"], answer: 2, },
    ],
    // --- M-105: JS Functions & Asynchronous Flow (New split) ---
    "m-105-final": [
        { id: "m105-q1", question: "Which method is used to iterate over an array and create a new array based on the returned values?", options: ["forEach()", "map()", "filter()", "reduce()"], answer: 1, },
        { id: "m105-q2", question: "What is the purpose of the `Promise.all()` method?", options: ["To execute a single promise and handle its result", "To wait for all promises in an array to fulfill and return an array of their results", "To execute promises sequentially", "To catch errors from a single promise"], answer: 1, },
        { id: "m105-q3", question: "How do you handle errors with `async/await`?", options: ["Using a `.catch()` block", "Using a `try...catch` block", "Using `Promise.reject()`", "Using a specific `await.error` keyword"], answer: 1, },
        { id: "m105-q4", question: "The Fetch API promise only rejects on:", options: ["404 responses", "Server-side errors (5xx)", "Network failures", "JSON parsing errors"], answer: 2, },
    ],
    // --- M-106: React Fundamentals I (JSX, Props) ---
    "m-106-final": [
        { id: "m106-q1", question: "JSX compiles down to what?", options: ["Plain HTML", "Pure CSS", "JavaScript objects (React elements)", "WebAssembly"], answer: 2, },
        { id: "m106-q2", question: "The Virtual DOM is used by React primarily to:", options: ["Handle state management", "Improve CSS styling", "Efficiently update the actual browser DOM", "Enable server-side rendering"], answer: 2, },
        { id: "m106-q3", question: "In React, Props are strictly:", options: ["Mutable", "Stateful", "Write-only", "Read-only"], answer: 3, },
        { id: "m106-q4", question: "When rendering a list of elements, what unique prop must be provided to each item?", options: ["ref", "id", "key", "index"], answer: 2, },
    ],
    // --- M-107: React Fundamentals II (State, Effects) ---
    "m-107-final": [
        { id: "m107-q1", question: "What is a component's state in React?", options: ["A static data object", "An object that holds data and determines how the component renders", "A function that returns JSX", "The props passed to the component"], answer: 1, },
        { id: "m107-q2", question: "Which hook is used for side effects (like data fetching or subscriptions)?", options: ["useState", "useContext", "useEffect", "useReducer"], answer: 2, },
        { id: "m107-q3", question: "What is the purpose of the cleanup function returned from `useEffect`?", options: ["To finalize state updates", "To unsubscribe from event listeners or clear timers", "To signal that the effect has completed successfully", "To run code before the component mounts"], answer: 1, },
        { id: "m107-q4", question: "The React SyntheticEvent system is designed to:", options: ["Prevent memory leaks", "Ensure consistent event behavior across different browsers", "Replace all native DOM events", "Run asynchronous operations"], answer: 1, },
    ],
    // --- M-108: Advanced React (Context, Reducers, Memoization) ---
    "m-108-final": [
        { id: "m108-q1", question: "What is 'prop drilling'?", options: ["Passing props down through multiple layers of components unnecessarily", "A technique for optimizing component rendering", "The process of deconstructing component props", "A method for debugging state issues"], answer: 0, },
        { id: "m108-q2", question: "The `useReducer` hook is primarily an alternative to `useState` when dealing with what?", options: ["Simple boolean toggles", "Side effects", "Complex state logic involving multiple sub-values", "Asynchronous operations"], answer: 2, },
        { id: "m108-q3", question: "What is the purpose of the `useCallback` hook?", options: ["To memoize a value", "To memoize an entire component", "To memoize a function definition between renders", "To manage global state"], answer: 2, },
        { id: "m108-q4", question: "Which feature allows you to render content outside the normal DOM hierarchy?", options: ["Error Boundaries", "Context API", "React Portals", "Custom Hooks"], answer: 2, },
    ],
    // --- M-109: SQL/Database Fundamentals (New split) ---
    "m-109-final": [
        { id: "m109-q1", question: "What does SQL stand for?", options: ["Structured Question Language", "Standard Query Logic", "Sequential Query Language", "Structured Query Language"], answer: 3, },
        { id: "m109-q2", question: "Which SQL clause is used to filter records based on a specified condition?", options: ["SELECT", "FROM", "WHERE", "JOIN"], answer: 2, },
        { id: "m109-q3", question: "What is the primary goal of database normalization?", options: ["To speed up query execution time", "To reduce data redundancy and improve data integrity", "To increase the database storage capacity", "To allow for non-relational data structures"], answer: 1, },
        { id: "m109-q4", question: "Which of the ACID properties ensures a committed transaction remains committed even after a system failure?", options: ["Atomicity", "Consistency", "Isolation", "Durability"], answer: 3, },
        { id: "m109-q5", question: "The relationship where one row in Table A can relate to many rows in Table B is called what?", options: ["One-to-One", "One-to-Many", "Many-to-Many", "Many-to-One"], answer: 1, },
    ],
    // --- M-110: SQL Joins & Aggregation (New split) ---
    "m-110-final": [
        { id: "m110-q1", question: "Which type of JOIN returns all rows when there is a match in one of the tables and all rows from the other table, filling in NULL where there is no match?", options: ["INNER JOIN", "FULL OUTER JOIN", "LEFT JOIN", "RIGHT JOIN"], answer: 1, },
        { id: "m110-q2", question: "The SQL `HAVING` clause is used to filter what?", options: ["Individual rows", "Grouped results (after GROUP BY)", "Columns", "Database names"], answer: 1, },
        { id: "m110-q3", question: "Which SQL command is used to change the structure of an existing table (e.g., add a column)?", options: ["UPDATE TABLE", "MODIFY TABLE", "ALTER TABLE", "REDEFINE TABLE"], answer: 2, },
        { id: "m110-q4", question: "What is the primary purpose of indexing in a database?", options: ["Ensure data integrity", "Speed up SELECT queries", "Simplify joins", "Reduce storage space"], answer: 1, },
    ],
    // --- M-111: Python Fundamentals (Syntax, OOP) ---
    "m-111-final": [
        { id: "m111-q1", question: "Which Python data structure is unordered, unindexed, unchangeable, and used to store unique items?", options: ["List", "Tuple", "Dictionary", "Set"], answer: 3, },
        { id: "m111-q2", question: "What is the purpose of the `__init__` method in a Python class?", options: ["To initialize a variable", "The default method for a class instance", "The constructor, used to initialize the object's state", "A method for deletion"], answer: 2, },
        { id: "m111-q3", question: "In Python, which scope rule determines the order of variable lookup?", options: ["TDZ", "FILO", "LEGB", "FIFO"], answer: 2, },
        { id: "m111-q4", question: "What is a *decorator* in Python?", options: ["A special type of function that modifies or enhances another function", "A syntax for creating classes", "A way to define variables globally", "A built-in data structure"], answer: 0, },
        { id: "m111-q5", question: "In Python, what is the primary purpose of a virtual environment?", options: ["To allow multiple Python versions to run simultaneously", "To isolate project dependencies and prevent conflicts", "To speed up code execution", "To secure package installations"], answer: 1, },
    ],
    // --- M-112: Backend Architecture & Security (New split) ---
    "m-112-final": [
        { id: "m112-q1", question: "What is an ORM (Object-Relational Mapper)?", options: ["A database language", "A tool for converting object data into relational data (and vice-versa)", "A type of SQL database", "A server configuration standard"], answer: 1, },
        { id: "m112-q2", question: "In a RESTful API, which HTTP method is typically idempotent?", options: ["POST", "GET", "PUT", "DELETE"], answer: 2, },
        { id: "m112-q3", question: "What is the purpose of the WSGI standard in Python web development?", options: ["To define the syntax of a new web language", "To serve static files efficiently", "To provide a universal interface between web servers and Python web applications", "To handle database migrations"], answer: 2, },
        { id: "m112-q4", question: "Which security vulnerability is mitigated by using a Content Security Policy (CSP)?", options: ["SQL Injection", "Cross-Site Request Forgery (CSRF)", "Cross-Site Scripting (XSS)", "DDoS Attacks"], answer: 2, },
        { id: "m112-q5", question: "Which type of token is commonly used for **stateless** authentication in modern APIs?", options: ["Session Cookies", "OAuth Tokens", "API Keys", "JSON Web Tokens (JWT)"], answer: 3, },
    ],
};

/* -------------------- STATIC MODULE CONTENT -------------------- */

// M-101: Core HTML5 & Semantics (EXPANDED)
const MODULE_M101_SUBMODULES: DetailedSubmodule[] = [
    createContent("m-101", "1.1 Core HTML Structure and Boilerplate", "10 min", (
        <React.Fragment>
            <p className="mb-4">
                **HTML (HyperText Markup Language)** serves as the fundamental layer of all web pages. It is a **markup language**, not a programming language, used to establish the structure and semantic meaning of content. A correctly formed HTML document, known as the **boilerplate**, is the starting point for every web project.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3 text-blue-500">The Essential Boilerplate:</h4>
            <code className="block p-3 mt-2 bg-gray-100 dark:bg-gray-700 rounded-md whitespace-pre-wrap text-sm border border-blue-300 dark:border-blue-700">
{`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document Title</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Hello World</h1>
    <script src="app.js" defer></script>
</body>
</html>`}
            </code>
            <p className="mt-4">
                The **<code>&lt;head&gt;</code>** section is non-rendered metadata. It tells the browser *how* to handle the document (character set, scaling, styling, scripting). The **<code>&lt;body&gt;</code>** is the rendered content. Placing scripts at the end of the body or using the `defer` attribute on the script tag ensures the HTML content is fully parsed and loaded before the JavaScript execution begins.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3 text-blue-500">Script Loading Attributes:</h4>
            <ul className="list-disc ml-6 space-y-2">
                <li>**No attribute (Default):** HTML parsing pauses while the script is fetched and executed.</li>
                <li>**`defer`:** The script is fetched during HTML parsing and executed *after* the document is fully parsed but *before* the `DOMContentLoaded` event. Maintains script order. **Recommended** for most external scripts.</li>
                <li>**`async`:** The script is fetched during HTML parsing but executed immediately upon download. Execution does not wait for parsing to finish, nor does it wait for other scripts. Order is **not** guaranteed. Use for independent, non-critical scripts.</li>
            </ul>
        </React.Fragment>
    )),
    createContent("m-101", "1.2 Semantic HTML5 Elements: Beyond the Div", "15 min", (
        <React.Fragment>
            <p className="mb-4">
                **Semantic HTML** is the practice of using HTML elements according to their meaning, not just their appearance. This vastly improves **Accessibility (A11Y)** for screen readers and search engine **SEO** by providing clear structural context. Never use a <code>&lt;div&gt;</code> if a more appropriate semantic tag exists.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3 text-green-600 dark:text-green-400">Key Structural Elements:</h4>
            <ul className="list-disc ml-6 space-y-2">
                <li>**<code>&lt;main&gt;</code>:** Contains the unique, central content of the document. A document should only have **one** visible <code>&lt;main&gt;</code> tag.</li>
                <li>**<code>&lt;header&gt;</code>:** Typically contains the site logo, site name, and sometimes the primary navigation. It is often a child of <code>&lt;body&gt;</code> or <code>&lt;section&gt;</code>/<code>&lt;article&gt;</code>.</li>
                <li>**<code>&lt;nav&gt;</code>:** Groups a set of major navigation links (e.g., primary menu).</li>
                <li>**<code>&lt;article&gt;</code>:** Represents a self-contained composition that is independently distributable or reusable (e.g., a blog post, a news story, a comment).</li>
                <li>**<code>&lt;section&gt;</code>:** A thematic grouping of content, typically with a heading. It should generally be used when the content is related but distinct from other content sections.</li>
                <li>**<code>&lt;aside&gt;</code>:** Content related to the main content but separate from it (e.g., a sidebar, pull quotes).</li>
                <li>**<code>&lt;figure&gt;</code> & <code>&lt;figcaption&gt;</code>:** Used to mark up content (like an image or diagram) and its caption. This keeps the image and its caption semantically linked.</li>
            </ul>
            <h4 className="text-xl font-semibold mt-6 mb-3 text-green-600 dark:text-green-400">Text Semantics:</h4>
            <ul className="list-disc ml-6 space-y-2">
                <li>**<code>&lt;strong&gt;</code>:** Denotes important, seriously important content (e.g., a warning). Renders bold.</li>
                <li>**<code>&lt;em&gt;</code>:** Denotes stress emphasis (e.g., changing the meaning of a sentence). Renders italic.</li>
                <li>**<code>&lt;b&gt;</code>** and **<code>&lt;i&gt;</code>** are presentational, used only when there is no deeper semantic meaning.</li>
            </ul>
        </React.Fragment>
    )),
    createContent("m-101", "1.3 Forms, Input Types, and Accessibility (ARIA)", "18 min", (
    <React.Fragment>
        <p className="mb-4">
            The **HTML Forms** module (<code>&lt;form&gt;</code>) is the primary method for gathering user input. Modern HTML5 introduced specialized **input types** (e.g., <code>type="email"</code>, <code>type="date"</code>) that offer built-in browser validation and better user interfaces, especially on mobile devices.
        </p>

        <h4 className="text-xl font-semibold mt-4 text-orange-500">The Form Accessibility Triad:</h4>
        <ul className="list-disc ml-6 space-y-2">
            <li>
                **<code>&lt;label&gt;</code>:** The single most important form accessibility tool. It is linked to the input via the <code>for</code> attribute, which must match the input’s <code>id</code>. Screen readers announce the label when the user focuses on the input.
            </li>
            <li>
                **<code>&lt;fieldset&gt;</code> & <code>&lt;legend&gt;</code>:** These provide a semantic grouping and caption for a set of related form controls (e.g., a group of radio buttons for "Preferred Contact Method").
            </li>
            <li>
                **<code>placeholder</code> attribute:** Useful as a hint, but **never** a replacement for the <code>&lt;label&gt;</code>, as it disappears when the user starts typing and is ignored by some screen reader configurations.
            </li>
        </ul>

        <h4 className="text-xl font-semibold mt-6 text-orange-500">Client-Side Validation:</h4>
        <p className="mt-2 mb-4">
            HTML validation attributes provide immediate user feedback and prevent malformed data from reaching the server, though **Server-side validation is always required** for security.
        </p>
        <code className="block p-3 mt-2 bg-gray-100 dark:bg-gray-700 rounded-md whitespace-pre-wrap text-sm border border-orange-300 dark:border-orange-700">
{`<input type="email" id="email" required>

<input type="number" id="rating" min="1" max="100">

<input type="text" pattern=".{8}" required title="8 characters minimum">`}
        </code>

        <h4 className="text-xl font-semibold mt-6 text-orange-500">ARIA (Accessible Rich Internet Applications):</h4>
        <p className="mt-2 mb-4">
            **ARIA** attributes are a last resort, used to describe non-semantic elements (like a `div`-based custom dropdown) to assistive technology.
        </p>
        <ul className="list-disc ml-6 space-y-2">
            <li>**The First Rule of ARIA:** Do not use an ARIA attribute if a native HTML element provides the equivalent role (e.g., use <code>&lt;button&gt;</code> instead of <code>&lt;div role="button"&gt;</code>).</li>
            <li>**Roles (<code>role="..."</code>):** Define what an element *is* (e.g., <code>role="alert"</code>, <code>role="dialog"</code>).</li>
            <li>**States and Properties (<code>aria-...</code>):** Define the element's status (e.g., <code>aria-expanded="true"</code>, <code>aria-current="page"</code>).</li>
        </ul>
    </React.Fragment>
    )),
];

// M-102: Core CSS Layout (Box Model & Flexbox) (EXPANDED)
const MODULE_M102_SUBMODULES: DetailedSubmodule[] = [
    createContent("m-102", "2.1 The CSS Box Model and Box-Sizing Mastery", "12 min", (
        <React.Fragment>
            <p className="mb-4">
                Every HTML element is a rectangular box governed by the **CSS Box Model**. Understanding its four concentric layers is vital for precise layout. The layers, from inside out, are: **Content**, **Padding** (clears area around content), **Border** (sits around padding), and **Margin** (clears area outside the border).
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3 text-red-500">The Problem with `content-box`:</h4>
            <p className="mb-4">
                The default model, `box-sizing: content-box`, means that if you set `width: 200px` and add `padding: 20px`, the **total width** becomes $200 + 20 \times 2 = 240px$. This makes width calculations tedious and error-prone.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3 text-green-500">The Global `border-box` Fix:</h4>
            <p className="mb-4">
                By setting **`box-sizing: border-box;`**, the defined `width` and `height` now **include** the padding and border. This is the modern, universally adopted standard for web development.
            </p>
            <code className="block p-3 mt-2 bg-gray-100 dark:bg-gray-700 rounded-md whitespace-pre-wrap text-sm border border-green-500 dark:border-green-700">
{`/* A simple and effective reset for all elements */
html {
    /* Sets the baseline for 'rem' unit */
    font-size: 16px;
}
*, *::before, *::after {
    box-sizing: border-box;
    /* Optional: Resets margin/padding for more control */
    margin: 0;
    padding: 0; 
}`}
            </code>
            <p className="mt-4">
                **Margin Collapse:** When two vertical margins meet (e.g., the bottom margin of an <code>&lt;h1&gt;</code> and the top margin of a <code>&lt;p&gt;</code>), only the largest of the two margins is retained. Horizontal margins **never** collapse.
            </p>
        </React.Fragment>
    )),
    createContent("m-102", "2.2 Flexbox: Mastering the Axes and Distribution", "20 min", (
        <React.Fragment>
            <p className="mb-4">
                **Flexbox (Flexible Box Module)** is a **one-dimensional** layout system for distributing space among items in an interface. You use it when you only need to control layout along a **single axis** at a time (either row or column).
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3 text-blue-500">Container Properties (`display: flex`):</h4>
            <ul className="list-disc ml-6 space-y-2">
                <li>**`flex-direction`:** Defines the **Main Axis** (`row`, `row-reverse`, `column`, `column-reverse`). The cross axis is always perpendicular to the main axis.</li>
                <li>**`justify-content`:** Controls alignment and spacing along the **Main Axis** (e.g., `flex-start`, `center`, `space-between`, `space-around`).</li>
                <li>**`align-items`:** Controls alignment of items along the **Cross Axis** (e.g., `flex-start`, `center`, `stretch`).</li>
                <li>**`flex-wrap`:** Controls whether items are forced onto a single line (`nowrap`) or wrap onto multiple lines (`wrap`).</li>
            </ul>
            <h4 className="text-xl font-semibold mt-6 mb-3 text-blue-500">Item Properties:</h4>
            <ul className="list-disc ml-6 space-y-2">
                <li>**`flex-grow`:** Defines the ability for a flex item to grow if necessary. Default is 0 (no growth).</li>
                <li>**`flex-shrink`:** Defines the ability for a flex item to shrink if necessary. Default is 1 (can shrink).</li>
                <li>**`flex-basis`:** Defines the default size of an element before the remaining space is distributed. Default is `auto`.</li>
                <li>**Shorthand `flex: 1`:** This is equivalent to `flex-grow: 1; flex-shrink: 1; flex-basis: 0%;`. It is the common way to make items share space equally.</li>
                <li>**`align-self`:** Allows individual items to override the container's `align-items` property.</li>
            </ul>
            <h4 className="text-xl font-semibold mt-6 mb-3 text-blue-500">Flex Code Example (Vertical Centering):</h4>
            <p className="mb-4">
                The easiest way to center a single item both horizontally and vertically using Flexbox:
            </p>
            <code className="block p-3 mt-2 bg-gray-100 dark:bg-gray-700 rounded-md whitespace-pre-wrap text-sm border border-blue-500 dark:border-blue-700">
{`.container {
    display: flex;
    /* Main Axis: Horizontal center */
    justify-content: center;
    /* Cross Axis: Vertical center */
    align-items: center;
    height: 100vh;
}
.item {
    /* The item being centered */
    width: 200px;
    height: 200px;
}`}
            </code>
        </React.Fragment>
    )),
];

// M-103: Advanced CSS (Grid, Responsive, Specificity) (EXPANDED)
const MODULE_M103_SUBMODULES: DetailedSubmodule[] = [
    createContent("m-103", "3.1 CSS Grid: Two-Dimensional Layout and `fr` Unit", "18 min", (
        <React.Fragment>
            <p className="mb-4">
                **CSS Grid** is the modern, **two-dimensional** layout solution. It is used to define both rows and columns simultaneously, making it ideal for overall **page structure (layout)**, while Flexbox handles component distribution (inside the grid cells).
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3 text-purple-500">Grid Container Properties (`display: grid`):</h4>
            <ul className="list-disc ml-6 space-y-2">
                <li>**`grid-template-columns` / `rows`:** Defines the track sizes. You can use fixed units (`px`, `rem`) or flexible units (`fr`).</li>
                <li>**`fr` (Fractional Unit):** An `fr` unit represents one fraction of the available space in the grid container. A column defined as `1fr 2fr 1fr` will take up 1/4, 1/2, and 1/4 of the total space, respectively.</li>
                <li>**`gap`:** Defines the space between the rows and columns (replacing margin hacks).</li>
                <li>**`repeat()` function:** Simplifies creating many columns of the same size, e.g., `repeat(4, 1fr)`.</li>
                <li>**`auto-fit` / `auto-fill`:** Used within `repeat()` to create truly responsive, column-breaking layouts (e.g., a photo gallery).</li>
            </ul>
            <h4 className="text-xl font-semibold mt-6 mb-3 text-purple-500">Grid Item Placement:</h4>
            <p className="mb-4">
                Grid items are placed using their line numbers, which start at 1.
            </p>
            <code className="block p-3 mt-2 bg-gray-100 dark:bg-gray-700 rounded-md whitespace-pre-wrap text-sm border border-purple-500 dark:border-purple-700">
{`.container {
    display: grid;
    /* Two auto-sized columns, one flexible column */
    grid-template-columns: auto auto 1fr; 
    grid-template-rows: 100px auto;
}
.header {
    /* Starts at column line 1 and spans to line 4 */
    grid-column: 1 / 4; 
}
.sidebar {
    /* Starts at row line 2 and spans 2 tracks */
    grid-row: 2 / span 2; 
}`}
            </code>
        </React.Fragment>
    )),
    createContent("m-103", "3.2 Responsive Design, Media Queries, and Mobile-First", "15 min", (
        <React.Fragment>
            <p className="mb-4">
                **Responsive Web Design (RWD)** means creating layouts that adapt fluidly to different screen sizes and orientations. The cornerstones are a fluid grid system, flexible images, and **Media Queries**.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3 text-orange-500">The Mobile-First Philosophy:</h4>
            <p className="mb-4">
                The **Mobile-First** approach is superior because it ensures the fastest load time for mobile users (the most constrained environment) and forces developers to prioritize content.
            </p>
            <ul className="list-disc ml-6 space-y-2">
                <li>**Base Styles:** All CSS rules are written for the smallest screen (mobile phones).</li>
                <li>**Breakpoints:** **Media Queries** are used to progressively enhance the layout only when the screen size is large enough.</li>
                <li>**Syntax:** This means using **`min-width`** for all your media queries.</li>
            </ul>
            <code className="block p-3 mt-4 bg-gray-100 dark:bg-gray-700 rounded-md whitespace-pre-wrap text-sm border border-orange-500 dark:border-orange-700">
{`/* 1. Mobile (Base Styles - ALWAYS active) */
.nav-menu { display: none; } 

/* 2. Tablet (Overwrite mobile styles when screen is AT LEAST 768px wide) */
@media (min-width: 768px) { 
    .nav-menu { 
        display: flex; 
        flex-direction: row; 
    } 
}

/* 3. Desktop (Overwrite tablet styles when screen is AT LEAST 1024px wide) */
@media (min-width: 1024px) { 
    .container { 
        max-width: 1200px; 
    } 
}`}
            </code>
        </React.Fragment>
    )),
    createContent("m-103", "3.3 Specificity, Cascade, and Custom Properties", "14 min", (
        <React.Fragment>
            <p className="mb-4">
                The **Cascade** is the process the browser uses to combine multiple styles (author, user, browser defaults) into a single result. **Specificity** is the algorithm that determines which rule wins when two declarations conflict.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3 text-red-500">Specificity Hierarchy (Highest to Lowest):</h4>
            <ul className="list-disc ml-6 space-y-2">
                <li>**Inline Styles:** Highest (e.g., `)</li>
                <li>**ID Selectors:** High (e.g., `#my-id`)</li>
                <li>**Class, Attribute, and Pseudo-Class Selectors:** Medium (e.g., `.my-class`, `[type="text"]`, `:hover`)</li>
                <li>**Type (Element) and Pseudo-Element Selectors:** Lowest (e.g., `p`, `::before`)</li>
                <li>**The `!important` Rule:** This is the nuclear option. **Avoid using it**, as it breaks the cascade and makes debugging extremely difficult.</li>
            </ul>
            <p className="mt-4">
                **Inheritance:** Some properties (like `color`, `font-size`) are inherited by child elements unless explicitly overridden. Others (like `border`, `margin`) are not.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3 text-red-500">CSS Custom Properties (Variables):</h4>
            <p className="mb-4">
                **Custom Properties (`--variable-name`)** allow developers to store reusable values. They are dynamic, live, and respect the Cascade, often defined on the `:root` pseudo-class for global access.
            </p>
            <code className="block p-3 mt-2 bg-gray-100 dark:bg-gray-700 rounded-md whitespace-pre-wrap text-sm border border-red-500 dark:border-red-700">
{`/* Definition */
:root {
    --color-primary: #1d4ed8; /* Blue-700 */
    --spacing-md: 1rem;
}

/* Usage */
.button {
    background-color: var(--color-primary);
    padding: var(--spacing-md);
}`}
            </code>
        </React.Fragment>
    )),
];

// M-104: Core JavaScript Fundamentals (EXPANDED)
const MODULE_M104_SUBMODULES: DetailedSubmodule[] = [
    createContent("m-104", "4.1 Variable Scope, Hoisting, and the TDZ", "12 min", (
        <React.Fragment>
            <p className="mb-4">
                The shift from **`var`** to **`let`** and **`const`** is fundamental in modern JavaScript. **`let`** and **`const`** introduce **block scope** (), meaning variables declared within a block are not accessible outside it, preventing accidental global variable pollution.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3 text-yellow-500">Hoisting Explained:</h4>
            <p className="mb-4">
                **Hoisting** is JavaScript's behavior of moving all variable and function declarations to the top of their current scope during the compilation phase.
            </p>
            <ul className="list-disc ml-6 space-y-2">
                <li>**`var` and Functions:** Are hoisted, but `var` is only initialized with `undefined`.</li>
                <li>**`let` and `const`:** Are also hoisted, but they enter the **Temporal Dead Zone (TDZ)** from the start of the block until the declaration is reached. Accessing the variable in the TDZ results in a **ReferenceError**, which helps developers catch errors earlier.</li>
            </ul>
            <code className="block p-3 mt-4 bg-gray-100 dark:bg-gray-700 rounded-md whitespace-pre-wrap text-sm border border-yellow-500 dark:border-yellow-700">
{`// TDZ Example:
console.log(a); // Output: undefined (var is hoisted)
console.log(b); // Output: ReferenceError (let is in TDZ)
var a = 5;
let b = 10;

// Best Practice: Always use 'const' unless you need to reassign the variable.
const MAX_USERS = 50; 
let counter = 0; // Okay to use 'let' here as it needs reassigning`}
            </code>
        </React.Fragment>
    )),
    createContent("m-104", "4.2 Data Types, Mutability, and Strict Equality", "15 min", (
        <React.Fragment>
            <p className="mb-4">
                JavaScript divides data types into **Primitives** (passed by value) and **Objects** (passed by reference).
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3 text-orange-500">Primitives (Immutable):</h4>
            <p><code>string</code>, <code>number</code>, <code>boolean</code>, <code>null</code>, <code>undefined</code>, <code>symbol</code>, <code>bigint</code>.</p>
            <p className="mt-2">
                When you assign a primitive to a new variable, you copy the value. Changes to one do not affect the other.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3 text-orange-500">Objects (Mutable):</h4>
            <p><code>object</code> (including arrays and functions).</p>
            <p className="mt-2">
                When you assign an object, you copy the **reference** (the memory address). Changes made through one variable are visible through the other. Always clone objects/arrays when needed to enforce immutability (e.g., using the spread operator `...`).
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3 text-orange-500">Strict Equality (`===`):</h4>
            <p className="mb-4">
                The **Strict Equality Operator (`===`)** compares both value **and** type, resulting in predictable behavior. The loose equality operator (`==`) performs **Type Coercion** before comparison, leading to tricky bugs.
            </p>
            <code className="block p-3 mt-2 bg-gray-100 dark:bg-gray-700 rounded-md whitespace-pre-wrap text-sm border border-orange-500 dark:border-orange-700">
{`// Type Coercion Example:
console.log(0 == false);   // true (Dangerous)
console.log('2' == 2);     // true (Dangerous)
console.log(0 === false);  // false (Safe)
console.log('2' === 2);    // false (Safe)

// Special Case: typeof null is 'object'. This is a long-standing JS bug.
console.log(typeof null);  // 'object'`}
            </code>
        </React.Fragment>
    )),
    createContent("m-104", "4.3 Functions, Lexical `this`, and Destructuring", "18 min", (
        <React.Fragment>
            <p className="mb-4">
                Functions are first-class citizens in JavaScript. ES6 introduced **Arrow Functions**, which fundamentally changed how the **`this`** keyword is bound.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3 text-blue-500">Arrow Functions and Lexical Scope:</h4>
            <p className="mb-4">
                Unlike traditional function declarations, **Arrow Functions** do not have their own `this` context. They inherit `this` from their parent scope (**lexical scoping**). This is usually the desired behavior, especially in event handlers and React components.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3 text-blue-500">Spread vs. Rest Syntax:</h4>
            <ul className="list-disc ml-6 space-y-2">
                <li>**Rest Parameters (`...args`):** Used in a function definition to collect an indefinite number of arguments into a real **Array**.</li>
                <li>**Spread Syntax (`...array`):** Used to expand an array or object into its individual elements or key-value pairs. Used for shallow cloning and merging arrays/objects immutably.</li>
            </ul>
            <h4 className="text-xl font-semibold mt-6 mb-3 text-blue-500">Destructuring:</h4>
            <p className="mb-4">
                **Destructuring** allows you to unpack values from arrays or properties from objects into distinct variables, reducing repetitive code.
            </p>
            <code className="block p-3 mt-2 bg-gray-100 dark:bg-gray-700 rounded-md whitespace-pre-wrap text-sm border border-blue-500 dark:border-blue-700">
{`// Object Destructuring with Aliasing
const user = { name: 'Alice', age: 30 };
const { name: userName, age } = user; // userName = 'Alice', age = 30

// Array Destructuring
const [first, , third] = [10, 20, 30]; // first = 10, third = 30 (skips 20)

// Spread for Immutability (Cloning/Merging)
const original = { a: 1, b: 2 };
const cloned = { ...original, c: 3 }; // Safe clone with new property`}
            </code>
        </React.Fragment>
    )),
];

// M-105: JS Asynchronous Programming & Array Methods (EXPANDED)
const MODULE_M105_SUBMODULES: DetailedSubmodule[] = [
    createContent("m-105", "5.1 Promises and the Fetch API Deep Dive", "18 min", (
        <React.Fragment>
            <p className="mb-4">
                **Asynchronous operations** (like fetching data, timers, file I/O) do not block the main execution thread. **Promises** are objects that manage the eventual result of an async operation.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3 text-purple-500">Promise States:</h4>
            <ul className="list-disc ml-6 space-y-2">
                <li>**Pending:** Initial state, neither fulfilled nor rejected.</li>
                <li>**Fulfilled:** The operation completed successfully. Triggers `.then()`.</li>
                <li>**Rejected:** The operation failed. Triggers `.catch()`.</li>
            </ul>
            <h4 className="text-xl font-semibold mt-6 mb-3 text-purple-500">The Fetch API:</h4>
            <p className="mb-4">
                The Fetch API returns a Promise that resolves to a **Response object**. Critically, this promise **only rejects** on network failure (e.g., DNS error, offline).
            </p>
            <code className="block p-3 mt-2 bg-gray-100 dark:bg-gray-700 rounded-md whitespace-pre-wrap text-sm border border-purple-500 dark:border-purple-700">
{`fetch('https://api.example.com/data')
  .then(response => {
    // CRITICAL: Manually check for HTTP error codes (e.g., 404, 500)
    if (!response.ok) { 
      throw new Error(\`HTTP error! status: \${response.status}\`); 
    }
    return response.json(); // Returns a new Promise for the JSON body
  })
  .then(data => console.log('Data:', data))
  .catch(error => console.error('Fetch or network error:', error));`}
            </code>
            <p className="mt-4">
                **Promise Combinators:** `Promise.all()` waits for all promises to fulfill or rejects immediately if any one of them rejects. `Promise.race()` returns the value/rejection of the first promise to settle.
            </p>
        </React.Fragment>
    )),
    createContent("m-105", "5.2 Async/Await: Sequential and Parallel Flow", "15 min", (
        <React.Fragment>
            <p className="mb-4">
                **`Async/Await`** is modern syntax for consuming Promises, allowing developers to write asynchronous code that reads like synchronous code, improving readability.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3 text-blue-500">Error Handling with Try/Catch:</h4>
            <p className="mb-4">
                All `await` calls should be wrapped in a **`try...catch`** block to catch rejections, just like synchronous error handling.
            </p>
            <code className="block p-3 mt-2 bg-gray-100 dark:bg-gray-700 rounded-md whitespace-pre-wrap text-sm border border-blue-500 dark:border-blue-700">
{`async function fetchData(url) {
    try {
        const response = await fetch(url);
        // Still need the manual response.ok check
        if (!response.ok) throw new Error(response.statusText); 
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Async operation failed:", error);
        // Propagate the error or return a fallback value
        throw error; 
    }
}`}
            </code>
            <h4 className="text-xl font-semibold mt-6 mb-3 text-blue-500">Parallel vs. Sequential Execution:</h4>
            <p className="mb-4">
                To run two asynchronous tasks sequentially, simply `await` them one after the other. To run them **in parallel** (which is usually much faster), initiate both Promises at the same time and then `await` the results using `Promise.all()`.
            </p>
        </React.Fragment>
    )),
    createContent("m-105", "5.3 Functional Array Methods Deep Dive", "16 min", (
        <React.Fragment>
            <p className="mb-4">
                Mastery of **Higher-Order Array Methods** is key to writing clean, functional, and immutable JavaScript. These methods typically take a callback function as an argument and never modify the original array.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3 text-green-500">1. `map()`: Transformation</h4>
            <p className="mb-2">
                Creates a **new array** populated with the results of calling a provided function on every element in the calling array. **Guaranteed** to return an array of the same length.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3 text-green-500">2. `filter()`: Selection</h4>
            <p className="mb-2">
                Creates a **new array** with all elements that pass the test implemented by the provided function. The length of the returned array will be less than or equal to the original.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3 text-green-500">3. `reduce()`: Accumulation</h4>
            <p className="mb-4">
                Executes a user-supplied **reducer** callback function on each element of the array, in order, passing in the return value from the calculation on the preceding element. The final result is a single value (the accumulator).
            </p>
            <code className="block p-3 mt-2 bg-gray-100 dark:bg-gray-700 rounded-md whitespace-pre-wrap text-sm border border-green-500 dark:border-green-700">
{`const numbers = [1, 2, 3];
// Map: Returns [2, 4, 6]
const doubled = numbers.map(n => n * 2); 

// Filter: Returns [2]
const evens = numbers.filter(n => n % 2 === 0);

// Reduce: Returns 6 (1 + 2 + 3, starting accumulator at 0)
const sum = numbers.reduce((acc, current) => acc + current, 0); 

// Using Reduce for complex tasks (e.g., grouping)
const grouped = items.reduce((acc, item) => {
    const key = item.category;
    acc[key] = acc[key] || [];
    acc[key].push(item.name);
    return acc;
}, {}); // Starting accumulator is an empty object`}
            </code>
        </React.Fragment>
    )),
];


// M-106: React Fundamentals I (JSX, Props, VDOM) (EXPANDED)
const MODULE_M106_SUBMODULES: DetailedSubmodule[] = [
    createContent("m-106", "6.1 Intro to React and the Virtual DOM: Reconciliation", "12 min", (
        <React.Fragment>
            <p className="mb-4">
                **React** is a declarative, component-based library. The core innovation is the **Virtual DOM (VDOM)**, an in-memory tree representation of the actual browser DOM.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3 text-purple-500">The Reconciliation Process:</h4>
            <ul className="list-disc ml-6 space-y-2">
                <li>**Render:** A component's `render` function (or JSX) is called, creating a tree of **React Elements** (simple JavaScript objects).</li>
                <li>**Diffing:** React compares this new tree with the previous VDOM snapshot.</li>
                <li>**Batching:** All detected changes are batched into a single, optimized update operation.</li>
                <li>**Commit:** React performs the minimal set of direct DOM manipulations required to synchronize the browser DOM with the new VDOM tree.</li>
            </ul>
            <p className="mt-4">
                This process bypasses costly, direct DOM manipulation, making updates much faster and more efficient, particularly for complex, highly interactive UIs.
            </p>
        </React.Fragment>
    )),
    createContent("m-106", "6.2 JSX Syntax, Embedding Expressions, and Fragments", "15 min", (
        <React.Fragment>
            <p className="mb-4">
                **JSX (JavaScript XML)** is the syntax extension used by React. It allows you to write HTML-like markup directly within your JavaScript code. Remember, it is **compiled** into `React.createElement()` function calls at build time.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3 text-red-500">Key JSX Rules:</h4>
            <ul className="list-disc ml-6 space-y-2">
                <li>**Single Root Element:** Every component must return a single element (or a Fragment).</li>
                <li>**`className`:** HTML's `class` is a reserved keyword in JavaScript, so we use `className`.</li>
                <li>**Self-Closing Tags:** All tags must be closed (e.g., `<img />`, `<br />`).</li>
                <li>**Embedded Expressions:** Use **curly braces (`{}`)** to embed any valid JavaScript expression (variables, function calls, logical operations) into the markup.</li>
            </ul>
            <h4 className="text-xl font-semibold mt-6 mb-3 text-red-500">Conditional Rendering in JSX:</h4>
            <p className="mb-4">
                You cannot use traditional `if/else` statements directly inside JSX. Instead, use the **Ternary Operator** or the **Logical AND Operator (`&&`)**.
            </p>
            <code className="block p-3 mt-2 bg-gray-100 dark:bg-gray-700 rounded-md whitespace-pre-wrap text-sm border border-red-500 dark:border-red-700">
{`const isLoggedIn = true;
const userMessage = (
    <div>
        {/* Ternary Operator */}
        {isLoggedIn 
            ? <button>Logout</button> 
            : <button>Login</button>
        }

        {/* Logical AND (Renders only if condition is true) */}
        {isLoggedIn && <p>Welcome back!</p>}
    </div>
);`}
            </code>
            <p className="mt-4">
                **Fragments (`<></>`):** Used when you need a single root element without introducing an unnecessary extra <code>&lt;div&gt;</code> into the DOM structure.
            </p>
        </React.Fragment>
    )),
    createContent("m-106", "6.3 Props and Unidirectional Data Flow: Passing Callbacks", "13 min", (
        <React.Fragment>
            <p className="mb-4">
                **Props (Properties)** are the mechanism for passing data from a **parent** component to a **child** component. The flow is strictly **unidirectional** (top-down), enforcing predictable application behavior.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3 text-green-500">The Immutability Rule:</h4>
            <p className="mb-4">
                Props are **read-only** inside the child component. A child should never attempt to modify the props it receives. If a child needs to affect the parent's data, it must call a **callback function** provided by the parent via props.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3 text-green-500">Passing Data Upward with Callbacks:</h4>
            <code className="block p-3 mt-2 bg-gray-100 dark:bg-gray-700 rounded-md whitespace-pre-wrap text-sm border border-green-500 dark:border-green-700">
{`// 1. Parent Component
function Parent() {
    const [count, setCount] = useState(0);
    
    // Callback function to be passed down
    const handleIncrement = (value) => {
        setCount(prev => prev + value);
    };

    return (
        <Child onUpdate={handleIncrement} currentCount={count} />
    );
}

// 2. Child Component
function Child({ onUpdate, currentCount }) {
    return (
        <button onClick={() => onUpdate(1)} >
            Increment (Current: {currentCount})
        </button>
    );
}

// Result: Child calls the parent's function, allowing the parent 
// to update its own state and re-render the children with new props.
`}
            </code>
        </React.Fragment>
    )),
];

// M-107: React Fundamentals II (State, Effects) (EXPANDED)
const MODULE_M107_SUBMODULES: DetailedSubmodule[] = [
    createContent("m-107", "7.1 Hooks: useState and Immutability", "15 min", (
        <React.Fragment>
            <p className="mb-4">
                The **`useState`** hook is used to introduce local, reactive state into a functional component. It returns an array: <code>[stateValue, setStateFunction]</code>.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3 text-blue-500">Asynchronous Updates and Batching:</h4>
            <p className="mb-4">
                React **batches** state updates for performance. The setter function (e.g., `setCount`) does not immediately update the state value; it schedules a re-render.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3 text-blue-500">Functional Updates (When State Depends on Previous State):</h4>
            <p className="mb-4">
                When the new state value depends on the previous state (e.g., counters), you must use the **functional update form** of the setter to guarantee correctness, especially during batched updates.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3 text-blue-500">Immutability for Complex State:</h4>
            <p className="mb-4">
                When updating objects or arrays, you must create a **new** object or array. React compares the **reference** of the old and new state. If the reference is the same, React skips the re-render.
            </p>
            <code className="block p-3 mt-2 bg-gray-100 dark:bg-gray-700 rounded-md whitespace-pre-wrap text-sm border border-blue-500 dark:border-blue-700">
{`// 1. Correct Functional Update for Primitives:
setCount(prevCount => prevCount + 1);

// 2. Correct Immutable Array Update:
const handleAddTodo = (newTodo) => {
    // Uses the spread operator to create a new array reference
    setTodos(prevTodos => [...prevTodos, newTodo]); 
};

// 3. INCORRECT (Avoids triggering re-render):
// user.age = 31; 
// setUser(user); // Fails, reference is the same
`}
            </code>
        </React.Fragment>
    )),
    createContent("m-107", "7.2 Hooks: useEffect for Side Effects and Cleanup", "20 min", (
        <React.Fragment>
            <p className="mb-4">
                The **`useEffect`** hook is where you handle operations that interact with the "outside world," such as data fetching, manual DOM manipulation, setting up subscriptions, or logging.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3 text-orange-500">The Dependency Array (`[]`):</h4>
            <p className="mb-4">
                The second argument to `useEffect` controls *when* the effect re-runs:
            </p>
            <ul className="list-disc ml-6 space-y-2">
                <li>**No array:** The effect runs after *every* render. (Rarely used).</li>
                <li>**Empty array (`[]`):** The effect runs only once after the initial render (simulating `componentDidMount`).</li>
                <li>**Array with values (`[prop1, state2]`):** The effect runs on the initial render and whenever any value in the dependency array changes.</li>
            </ul>
            <h4 className="text-xl font-semibold mt-6 mb-3 text-orange-500">The Crucial Cleanup Function:</h4>
            <p className="mb-4">
                If your effect sets up a subscription or a timer, you must return a **cleanup function**. This function is executed when the component **unmounts** or **before the effect runs again**. Failure to include a cleanup function leads to memory leaks and unexpected behavior.
            </p>
            <code className="block p-3 mt-2 bg-gray-100 dark:bg-gray-700 rounded-md whitespace-pre-wrap text-sm border border-orange-500 dark:border-orange-700">
{`useEffect(() => {
    // 1. SIDE EFFECT: Set up a timer
    const timerId = setInterval(() => {
        console.log('Running...');
    }, 1000);

    // 2. CLEANUP: Clear the timer before unmount or re-run
    return () => {
        clearInterval(timerId); 
        console.log('Cleanup performed');
    };
}, []); // Empty array ensures this only runs on mount/unmount

// --- Data Fetching Pattern ---
useEffect(() => {
    let ignore = false; // Flag to handle race conditions during cleanup

    async function fetchUser() {
        // Fetch logic...
        if (!ignore) {
            // Set state
        }
    }
    fetchUser();

    return () => {
        // Cleanup function for data fetch prevents setting state on an unmounted component
        ignore = true; 
    }
}, [userId]); // Re-run when userId changes
`}
            </code>
        </React.Fragment>
    )),
    createContent("m-107", "7.3 Conditional Rendering, Lists, and Keys", "10 min", (
        <React.Fragment>
            <p className="mb-4">
                When rendering lists, the **`key`** prop is essential for VDOM reconciliation. React uses the key to identify which items in the list have changed, been added, or been removed.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3 text-red-500">The Key Rule:</h4>
            <ul className="list-disc ml-6 space-y-2">
                <li>**Key Must Be Stable:** The key should be a **unique, stable identifier** (e.g., database ID, UUID).</li>
                <li>**Avoid Index as Key:** Using the array index as the key is an anti-pattern if the list items can be reordered, added, or removed, as it confuses React's diffing algorithm and leads to performance issues and state bugs.</li>
            </ul>
        </React.Fragment>
    )),
];

// M-108: Advanced React (Hooks, Context, Performance) (EXPANDED)
const MODULE_M108_SUBMODULES: DetailedSubmodule[] = [
    createContent("m-108", "8.1 Context API and Prop Drilling Solution", "12 min", (
        <React.Fragment>
            <p className="mb-4">
                **Prop Drilling** (passing the same prop through many intermediate components) is the main motivation for the **Context API**. Context provides a way to pass data through the component tree without having to pass props down manually at every level.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3 text-purple-500">The Two Pillars of Context:</h4>
            <ul className="list-disc ml-6 space-y-2">
                <li>**<code>Context.Provider</code>:** Placed high up in the tree. Accepts a `value` prop that is broadcast to all descendants.</li>
                <li>**<code>useContext(ContextObject)</code>:** Used in any descendant component to subscribe to the context value.</li>
            </ul>
            <p className="mt-4">
                **Caution:** Context should be used for global, often static data (e.g., user theme, logged-in status). If the context value updates frequently, all consuming components will re-render, potentially causing performance bottlenecks. For complex global state, consider external state libraries.
            </p>
        </React.Fragment>
    )),
    createContent("m-108", "8.2 useReducer for Complex State Management", "15 min", (
        <React.Fragment>
            <p className="mb-4">
                **`useReducer`** is an alternative to `useState` for state logic that is more complex, involves multiple related sub-values, or where the next state depends on the previous state in a complicated manner. It is often a bridge to Redux-like patterns.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3 text-blue-500">The Reducer Pattern:</h4>
            <ul className="list-disc ml-6 space-y-2">
                <li>**State:** The current, immutable data structure.</li>
                <li>**Action:** A simple object (usually ) describing *what happened*.</li>
                <li>**Reducer:** A pure function `(state, action) = newState` that takes the current state and an action, and returns the *new* state (immutably).</li>
                <li>**`dispatch`:** The function provided by `useReducer` to send an action to the reducer.</li>
            </ul>
            <code className="block p-3 mt-4 bg-gray-100 dark:bg-gray-700 rounded-md whitespace-pre-wrap text-sm border border-blue-500 dark:border-blue-700">
{`function todoReducer(state, action) {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, { id: Date.now(), text: action.payload, completed: false }];
        case 'TOGGLE_TODO':
            return state.map(t => t.id === action.payload ? { ...t, completed: !t.completed } : t);
        default:
            return state;
    }
}
// In Component: const [todos, dispatch] = useReducer(todoReducer, []);
// To use: dispatch({ type: 'ADD_TODO', payload: 'New Item' });
`}
            </code>
        </React.Fragment>
    )),
    createContent("m-108", "8.3 Performance Optimization: Memoization Hooks", "16 min", (
        <React.Fragment>
            <p className="mb-4">
                **Memoization** prevents unnecessary re-computation or re-creation of values, objects, or functions. The key is to pass a dependency array to tell the hook exactly when the cached value should be recalculated.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3 text-green-500">`useMemo`: Memoizing Values</h4>
            <p className="mb-2">
                Caches the **return value** of an expensive function call. Only recalculates if one of its dependencies changes.
            </p>
            <code className="block p-3 mt-2 bg-gray-100 dark:bg-gray-700 rounded-md whitespace-pre-wrap text-sm border border-green-500 dark:border-green-700">
{`// Expensive filter/sort operation only re-runs if 'items' or 'filterTerm' changes
const visibleItems = useMemo(() => {
    return items.filter(i => i.name.includes(filterTerm));
}, [items, filterTerm]);
`}
            </code>
            <h4 className="text-xl font-semibold mt-6 mb-3 text-green-500">`useCallback`: Memoizing Functions</h4>
            <p className="mb-4">
                Caches the **function definition** itself. This is **critical** when passing a callback function as a prop to a child component that is wrapped in `React.memo` (or `useMemo`). Without `useCallback`, the parent creates a *new* function reference on every render, causing the child component to re-render unnecessarily.
            </p>
        </React.Fragment>
    )),
    createContent("m-108", "8.4 Custom Hooks, Portals, and Code Splitting", "12 min", (
        <React.Fragment>
            <p className="mb-4">
                **Custom Hooks** are functions that start with the prefix `use` (e.g., `useToggle`) and allow you to share and reuse stateful logic between components without sharing the state itself. They are the standard for logic reusability in React.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3 text-yellow-500">React Portals:</h4>
            <p className="mb-4">
                A **Portal** allows you to render children into a DOM node that exists **outside** the DOM hierarchy of the parent component. This is essential for rendering components like **Modals, Tooltips, and Loaders** that need to escape the styling (e.g., `overflow: hidden`) or z-index constraints of their parent.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3 text-yellow-500">Code Splitting and Lazy Loading:</h4>
            <p className="mb-4">
                To improve initial load time, we use **Code Splitting** to load only the code necessary for the initial view. **`React.lazy()`** and the **`Suspense`** component allow you to dynamically import component code when it is needed.
            </p>
        </React.Fragment>
    )),
];

// M-109 through M-112 content remains the original length due to the large expansion above.
// M-109: SQL/Database Fundamentals
const MODULE_M109_SUBMODULES: DetailedSubmodule[] = [
    createContent("m-109", "9.1 RDBMS, Keys, and ACID Principles", "6 min", (
        <React.Fragment>
            <p className="mb-4">
                **Relational Databases (RDBMS)** use tables, **Primary Keys** (unique ID), and **Foreign Keys** (linking tables). **ACID** (Atomicity, Consistency, Isolation, Durability) guarantees transactional integrity.
            </p>
        </React.Fragment>
    )),
    createContent("m-109", "9.2 Essential CRUD Commands", "8 min", (
        <React.Fragment>
            <p className="mb-4">
                CRUD operations map to: **`INSERT`** (Create), **`SELECT`** (Read), **`UPDATE`** (Update), and **`DELETE`** (Delete). Always use the **`WHERE`** clause with `UPDATE` and `DELETE`.
            </p>
            <p className="mt-4">
                `SELECT` uses `FROM` (table) and `WHERE` (filtering).
            </p>
        </React.Fragment>
    )),
    createContent("m-109", "9.3 Database Normalization (1NF, 2NF, 3NF)", "9 min", (
        <React.Fragment>
            <p className="mb-4">
                **Normalization** reduces redundancy: **1NF** (atomic values), **2NF** (no partial dependency on primary key), and **3NF** (no transitive dependency between non-key fields). 3NF is the typical goal.
            </p>
        </React.Fragment>
    )),
];

// M-110: SQL Joins, Aggregation, and Performance
const MODULE_M110_SUBMODULES: DetailedSubmodule[] = [
    createContent("m-110", "10.1 Mastering SQL JOINs", "10 min", (
        <React.Fragment>
            <p className="mb-4">
                **JOINs** combine data from multiple tables. Key types are **`INNER JOIN`** (only matched rows), **`LEFT JOIN`** (all left rows + matches), and **`FULL OUTER JOIN`** (all rows).
            </p>
        </React.Fragment>
    )),
    createContent("m-110", "10.2 Aggregation and Grouping", "9 min", (
        <React.Fragment>
            <p className="mb-4">
                **Aggregation Functions** (`COUNT`, `SUM`, `AVG`) summarize data. **`GROUP BY`** groups rows for aggregation. **`HAVING`** filters results *after* grouping, unlike `WHERE`.
            </p>
        </React.Fragment>
    )),
    createContent("m-110", "10.3 Indexing and Concurrency", "7 min", (
        <React.Fragment>
            <p className="mb-4">
                **Indexing** speeds up `SELECT` queries but slows down data modifications. **Concurrency Control** uses transactions (`BEGIN`, `COMMIT`, `ROLLBACK`) and isolation levels to manage simultaneous access safely.
            </p>
        </React.Fragment>
    )),
];

// M-111: Python Fundamentals
const MODULE_M111_SUBMODULES: DetailedSubmodule[] = [
    createContent("m-111", "11.1 Syntax, PEP 8, and Data Structures", "7 min", (
        <React.Fragment>
            <p className="mb-4">
                Python uses mandatory **indentation**. **PEP 8** defines the official style guide. Core data structures are **`list`** (mutable, ordered), **`tuple`** (immutable, ordered), **`dict`** (mutable, key-value), and **`set`** (unique elements).
            </p>
        </React.Fragment>
    )),
    createContent("m-111", "11.2 Functions, Scope, and OOP", "10 min", (
        <React.Fragment>
            <p className="mb-4">
                Functions use the `def` keyword. **OOP** uses `class` with the **`__init__(self)`** constructor. **LEGB** (Local, Enclosing, Global, Built-in) defines variable scope lookup order.
            </p>
            <p className="mt-4">
                **Decorators** (`@`) modify functions. **Context Managers** (`with`) automate resource cleanup (e.g., file closing).
            </p>
        </React.Fragment>
    )),
    createContent("m-111", "11.3 Environments, Packages, and I/O", "8 min", (
        <React.Fragment>
            <p className="mb-4">
                **Virtual Environments** (`venv`) isolate project dependencies. **`pip`** manages packages. **Exception Handling** uses `try...except...finally`.
            </p>
            <p className="mt-4">
                Use the `with open(...)` construct for safe **File I/O**.
            </p>
        </React.Fragment>
    )),
];

// M-112: Backend Architecture & Security
const MODULE_M112_SUBMODULES: DetailedSubmodule[] = [
    createContent("m-112", "12.1 REST APIs, Methods, and Server Architecture", "7 min", (
        <React.Fragment>
            <p className="mb-4">
                **REST** relies on standard **HTTP Methods** (GET, POST, PUT, DELETE) and **Status Codes**. Frameworks like **Django** (full-stack MTV) and **Flask** (micro-framework) structure the backend logic.
            </p>
        </React.Fragment>
    )),
    createContent("m-112", "12.2 ORM and Authentication/Authorization", "10 min", (
        <React.Fragment>
            <p className="mb-4">
                **ORM (Object-Relational Mapper)** translates Python objects to SQL, preventing **SQL Injection**. **JWT (JSON Web Tokens)** provide **stateless** authentication, while **Sessions** are stateful.
            </p>
        </React.Fragment>
    )),
    createContent("m-112", "12.3 API Security and Deployment", "12 min", (
        <React.Fragment>
            <p className="mb-4">
                Security requires mitigating **CORS** (cross-origin requests), **CSRF** (forgery), and **XSS** (script injection). **Deployment** relies on **WSGI** (server interface) and **Containers (Docker)** for portability.
            </p>
        </React.Fragment>
    )),
];

/* -------------------- DYNAMIC MODULE CONFIGURATION -------------------- */

// Now 12 modules total, M-101 through M-112.
export const FULLSTACK_COURSE_MODULES: ModuleDefinition[] = [
    { id: "m-101", title: "M-101: Core HTML5 & Semantics", submodules: MODULE_M101_SUBMODULES, quizId: "m-101-final", nextModuleId: "m-102" },
    { id: "m-102", title: "M-102: Core CSS Layout (Box Model & Flexbox)", submodules: MODULE_M102_SUBMODULES, quizId: "m-102-final", nextModuleId: "m-103" },
    { id: "m-103", title: "M-103: Advanced CSS (Grid & Responsive Design)", submodules: MODULE_M103_SUBMODULES, quizId: "m-103-final", nextModuleId: "m-104" },
    
    { id: "m-104", title: "M-104: Core JavaScript Fundamentals (Scope & Types)", submodules: MODULE_M104_SUBMODULES, quizId: "m-104-final", nextModuleId: "m-105" },
    { id: "m-105", title: "M-105: Asynchronous JS & Functional Methods", submodules: MODULE_M105_SUBMODULES, quizId: "m-105-final", nextModuleId: "m-106" },
    
    { id: "m-106", title: "M-106: React I: Components, JSX, & Props", submodules: MODULE_M106_SUBMODULES, quizId: "m-106-final", nextModuleId: "m-107" },
    { id: "m-107", title: "M-107: React II: State, Effects, & Lifecycle", submodules: MODULE_M107_SUBMODULES, quizId: "m-107-final", nextModuleId: "m-108" },
    { id: "m-108", title: "M-108: Advanced React (Context, Reducers, Performance)", submodules: MODULE_M108_SUBMODULES, quizId: "m-108-final", nextModuleId: "m-109" },
    
    { id: "m-109", title: "M-109: SQL & Database Fundamentals (ACID & Normalization)", submodules: MODULE_M109_SUBMODULES, quizId: "m-109-final", nextModuleId: "m-110" },
    { id: "m-110", title: "M-110: SQL Joins, Aggregation, & Indexing", submodules: MODULE_M110_SUBMODULES, quizId: "m-110-final", nextModuleId: "m-111" },
    
    { id: "m-111", title: "M-111: Python Fundamentals, OOP, & Environments", submodules: MODULE_M111_SUBMODULES, quizId: "m-111-final", nextModuleId: "m-112" },
    { id: "m-112", title: "M-112: Backend Architecture, Security, & Deployment", submodules: MODULE_M112_SUBMODULES, quizId: "m-112-final", nextModuleId: null }, // Final Module
];