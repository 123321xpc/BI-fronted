// declarations.d.ts
declare module '*.less' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '@@/exports' {
  // 根据实际模块导出内容定义类型
  const content: any;
  export default content;
}
