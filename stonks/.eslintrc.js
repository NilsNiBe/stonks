/**
 * Die ESLint-Konfiguration für dieses Projekt.
 * Siehe Wiki: https://gitlab.klafka-hinz.de/firstweb/dokumentation/-/wikis/Entwicklungsumgebung/ESLint
 *
 * Änderungen sind grundsätzlich möglich (falls die Regeln zu streng sind, oder nicht streng genug sind),
 * müssen aber bei der Jour-Fixe besprochen werden, damit alle Entwickler Bescheid wissen.
 *
 * List aller ESLint-Regeln:
 * - JavaScript: https://eslint.org/docs/rules/
 * - TypeScript: https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#supported-rules
 * - React: https://github.com/yannickcr/eslint-plugin-react#list-of-supported-rules
 * - React-Hooks: https://reactjs.org/docs/hooks-rules.html#eslint-plugin
 * - Import: https://github.com/benmosher/eslint-plugin-import#rules
 * - Styled-Components: https://github.com/siffogh/eslint-plugin-better-styled-components#supported-rules
 * - Accessibility: https://github.com/evcohen/eslint-plugin-jsx-a11y#supported-rules
 *
 * Standard-Konfiguration von `create-react-app` (wir erweitern und überschreiben die dortigen Regeln):
 * - https://github.com/facebook/create-react-app/blob/master/packages/eslint-config-react-app/index.js
 */

// Variablenname in Großbuchstaben, damit es im Syntax-Highlighting eine andere Farbe hat.
const OFF = "off";
// Während Entwicklung werden Warnungen angezeigt, damit der Code kompiliert. Die CI-/CD-Pipeline tut dank `--max-warnings 0` auch bei Warnungen fehlschlagen.
const warn = "warn";

// Lädt die Original-Regeln, die wir erweitern müssen.
const original = require("eslint-config-react-app");

const typeScriptOverrides = original.overrides.find(
  o => o.parser === "@typescript-eslint/parser"
);

function getNamingConventions({ enforceCamelCaseProperties = false } = {}) {
  return [
    {
      selector: "default",
      format: ["camelCase"],
    },

    // "object"-Typ für styled-components und Objekte
    {
      selector: "variable",
      format: ["PascalCase", "camelCase", "UPPER_CASE"],
    },

    // "function"-Typ für React-Komponenten und normale Funktionen
    {
      selector: "variable",
      types: ["function"],
      format: ["PascalCase", "camelCase"],
    },

    // normale Variablen
    {
      selector: "variable",
      types: ["boolean", "string", "number", "array"],
      format: ["camelCase", "UPPER_CASE"],
    },

    {
      selector: "parameter",
      format: ["camelCase"],
      leadingUnderscore: "allow",
    },

    {
      selector: "memberLike",
      modifiers: ["private"],
      format: ["camelCase"],
      leadingUnderscore: "require",
    },

    {
      selector: "property",
      format: enforceCamelCaseProperties ? ["camelCase"] : null,
    },

    {
      selector: "typeLike",
      format: ["PascalCase"],
    },
  ];
}

module.exports = {
  extends: ["react-app", "plugin:import/typescript"],
  plugins: ["better-styled-components", "import"],
  root: true,
  rules: {},
  overrides: [
    {
      files: ["**/*.ts?(x)"],
      parserOptions: {
        ...typeScriptOverrides.parserOptions,
        project: "./tsconfig.json",
      },
      rules: {
        // Folgende Regeln müssen deaktiviert werden, damit sie sich nicht mit den TypeScript-Regeln stören
        camelcase: OFF,
        quotes: OFF,
        semi: OFF,

        // -- Standard-Regeln --
        /** Kommentare müssen mit einem Großbuchstaben beginnen.
         * In Blockkommentaren muss nur die erste Zeile mit einem Großbuchstaben beginnen. */
        "capitalized-comments": [
          warn,
          "always",
          {
            ignoreConsecutiveComments: true,
            ignorePattern:
              "const|let|function|return|import|export|if|try|for|while",
          },
        ],
        /** Nach jedem Array- und Objekt-Element ein Komma, damit wir gefahrlos die Zeilen vertauschen oder neue Zeilen einfügen können. */
        "comma-dangle": [
          warn,
          {
            arrays: "always-multiline",
            objects: "always-multiline",
            imports: "always-multiline",
            exports: "always-multiline",
            functions: "never",
          },
        ],
        /** Vergleiche immer mit drei Gleich-Zeichen, um fehleranfällige Truthy-/Falsy-Vergleiche zu vermeiden. */
        eqeqeq: [warn, "always"],
        /** String-Properties in React müssen in Anführungszeichen (") stehen, nicht in Apostrophen ('). */
        "jsx-quotes": [warn, "prefer-double"],
        /** Niemals `var` nutzen, sondern `const` wenn die Variable nicht verändert wird, ansonsten `let`. */
        "no-var": warn,
        /** `styled-components`-Methoden immer aus dem Makro importieren, damit wir sinnvollere Klassennamen in den DevTools haben.
         * Niemals `react-foundation` importieren, dafür haben wir eigene Wrapper.
         */
        "no-restricted-imports": [
          warn,
          {
            paths: [
              {
                name: "styled-components",
                message: "Bitte aus styled-components/macro importieren.",
              },
              {
                name: "react-foundation",
                message: "Bitte GridLayout & GridCell nutzen.",
              },
            ],
            patterns: ["!styled-components/macro"],
          },
        ],
        /** Objekt-Properties, die einer Variablen mit dem gleichen Namen zugewiesen werden, brauchen nicht doppelt benannt werden. */
        "object-shorthand": ["warn", "properties"],
        /** Variablen, die nicht verändert werden, müssen mit `const` statt `let` definiert werden. */
        "prefer-const": warn,
        /** Der `+`-Operator darf nur genutzt werden, um Zahlen zu addieren. Strings müssen mit Template-Literals aneinander gefügt werden. */
        "prefer-template": warn,
        "spaced-comment": [
          warn,
          "always",
          {
            line: {
              markers: ["/"],
              exceptions: ["-", "+"],
            },
            block: {
              markers: ["!"],
              exceptions: ["*"],
              balanced: true,
            },
          },
        ],
        // /** Verbot von globalen Variablen */
        // "no-restricted-globals": [
        //   "error",
        //   {
        //     name: "error",
        //     message: "Use local parameter instead.",
        //   },
        //   {
        //     name: "event",
        //     message: "Use local parameter instead.",
        //   },
        //   {
        //     name: "fetch",
        //     message: "Bitte api.fetch nutzen.",
        //   },
        // ],

        // -- React-Regeln --
        /** Boolesche Properties brauchen nicht extra auf `true` gesetzt werden: `<X isActive />` statt `<X isActive={true} />`.
         *  Ausnahme bei `value`, weil es von React-Kontext-Providern genutzt wird und wir hier explizit den Boolean angeben wollen. */
        "react/jsx-boolean-value": [warn, "never", { always: ["value"] }],
        /** In einer Schleife wie `map()` müssen alle Elemente eine eindeutige `key`-Prop erhalten. */
        "react/jsx-key": warn,
        /** Fragmente dürfen nur verwendet werden, wenn sie zwei oder mehr Kindelemente enthalten. */
        "react/jsx-no-useless-fragment": warn,
        /** React-eigene Props (key, ref, children) müssen immer an erster Stelle stehen. */
        "react/jsx-sort-props": [
          warn,
          { noSortAlphabetically: true, reservedFirst: true },
        ],
        /** Elemente ohne Kinder müssen sich selbst schließen: `<div />` statt `<div></div>`. */
        "react/self-closing-comp": warn,
        /** Bestimmte Elemente dürfen keine Kinder haben: `<br />` und `<img />`. */
        "react/void-dom-elements-no-children": warn,

        // -- TypeScript-Regeln --
        /** Groß-/Kleinschreibung von Variablen- und Methodennamen */
        "@typescript-eslint/naming-convention": [
          warn,
          ...getNamingConventions({ enforceCamelCaseProperties: false }),
        ],
        /** Strings müssen immer in Anführungszeichen (") stehen, nicht in Apostrophen ('). Ausnahmen: `lorem ${x} ipsum` und 'ein "wichtiges" Wort' */
        "@typescript-eslint/quotes": [warn, "double", { avoidEscape: true }],
        /** Strings und Zahlen sollen niemals mit `+` gemischt werden. In solchen Fällen zuerst die Zahl in einen String umwandeln. */
        "@typescript-eslint/restrict-plus-operands": [
          warn,
          { checkCompoundAssignments: true },
        ],
        /** Immer Semikolons (;) am Zeilenende schreiben. */
        "@typescript-eslint/semi": [warn, "always"],

        // -- Styled-Components --
        /** CSS-Regeln alphabetisch sortieren. */
        "better-styled-components/sort-declarations-alphabetically": warn,

        // -- Importe --
        /** Bestimmte Dateien dürfen nicht aus bestimmten anderen Dateien importieren. */
        "import/no-restricted-paths": [
          warn,
          {
            zones: [
              // Komponenten dürfen nicht aus dem Barrel-File importieren
              {
                target: "./src/shared/components/block",
                from: "./src/shared/components/index.ts",
              },
              {
                target: "./src/shared/components/complex",
                from: "./src/shared/components/index.ts",
              },
              {
                target: "./src/shared/components/inline",
                from: "./src/shared/components/index.ts",
              },
              // GlobalStyle darf nicht aus dem Barrel-File importieren
              {
                target: "./src/shared/GlobalStyle.tsx",
                from: "./src/shared/components/index.ts",
              },
            ],
          },
        ],
        /** `index.ts` nicht explizit importieren, sondern nur den Ordnernamen importieren. */
        "import/no-useless-path-segments": [warn, { noUselessIndex: true }],
      },
    },
    {
      files: ["**/__tests__/*.ts?(x)"],
      rules: {
        "import/no-restricted-paths": [
          warn,
          {
            zones: [
              // Tests dürfen nicht die Komponenten direkt importieren, sondern müssen aus dem Barrel-File importieren
              {
                target: "./src/shared/components/block",
                from: "./src/shared/components",
                except: ["./index.ts", "./__testSetup__/Renderer.tsx"],
              },
              {
                target: "./src/shared/components/complex",
                from: "./src/shared/components",
                except: ["./index.ts", "./__testSetup__/Renderer.tsx"],
              },
              {
                target: "./src/shared/components/inline",
                from: "./src/shared/components",
                except: ["./index.ts", "./__testSetup__/Renderer.tsx"],
              },
            ],
          },
        ],
      },
    },
    {
      files: ["**/*samples.ts?(x)", "**/*stories.ts?(x)"],
      rules: {
        "@typescript-eslint/naming-convention": [
          warn,
          ...getNamingConventions({ enforceCamelCaseProperties: false }),
        ],
      },
    },
  ],
};
