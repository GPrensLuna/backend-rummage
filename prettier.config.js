module.exports = {
  experimentalTernaries: true, // Habilita la experimentación con ternarios más complejos
  printWidth: 80, // Ancho máximo de línea antes de que Prettier haga un salto de línea
  tabWidth: 2, // Número de espacios por tabulación
  useTabs: false, // Usa espacios en lugar de tabuladores
  semi: false, // No agregar punto y coma al final de las declaraciones
  singleQuote: true, // Usa comillas simples en lugar de comillas dobles
  quoteProps: as-needed, // Solo agregar comillas a las propiedades de los objetos cuando sea necesario
  jsxSingleQuote: false, // No usar comillas simples para JSX, usar comillas dobles
  trailingComma: all, // Agregar coma al final de los elementos (si hay varios) en arrays y objetos
  bracketSpacing: true, // Espacio entre los corchetes de objetos (ej: { key: value })
  bracketSameLine: true, // Los corchetes de los objetos no deben ir en la misma línea que la última propiedad
  arrowParens: always, // Siempre rodear los parámetros de las funciones con paréntesis
  parser: typescript, // El analizador que se utiliza para analizar el código. "babel" es una opción común para JavaScript y TypeScript.
  requirePragma: false, // No se requiere pragma (comentario de preprocesador como /* @jsx */)
  insertPragma: false, // No insertar automáticamente un pragma (comentario de preprocesador)
  proseWrap: always, // Ajuste de texto en archivos de formato largo, siempre que el texto se ajuste
  htmlWhitespaceSensitivity: css, // Sensibilidad al espacio en blanco dentro de archivos HTML (opciones: "css", "strict", "ignore")
  vueIndentScriptAndStyle: false, // No identar el código dentro de los `<script>` y `<style>` de archivos Vue
  endOfLine: lf, // Usar el salto de línea `LF` (de línea de texto) al final del archivo
  embeddedLanguageFormatting: auto, // Formatear el código incrustado (por ejemplo, código en HTML o Markdown)
  singleAttributePerLine: false, // No colocar un atributo de un solo valor en una línea separada (solo para HTML o JSX)
  requireConfig: true, // Requiere que haya una configuración de Prettier antes de formatear archivos
  fileInfoOptions: {
    // Opciones para el análisis de información de archivos
    withNodeModules: true, // Incluir módulos de node_modules en el análisis
    module: true, // Permite que el módulo de Prettier se incluya en la configuración
  },
}
