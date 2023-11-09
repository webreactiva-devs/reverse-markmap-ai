import React, { useRef, useEffect } from "react";
import { Transformer } from "markmap-lib";
import { Markmap } from "markmap-view";
import { Toolbar } from "markmap-toolbar";
import "markmap-toolbar/dist/style.css";

const transformer = new Transformer();

function renderToolbar(mm: Markmap, wrapper: HTMLElement) {
  while (wrapper.firstChild) wrapper.firstChild.remove();
  if (mm && wrapper) {
    const toolbar = new Toolbar();
    toolbar.attach(mm);
    toolbar.setItems([...Toolbar.defaultItems, "alert"]);
    wrapper.append(toolbar.render());
  }
}

export default function MarkmapComponent({ content }) {
  const refSvg = useRef<SVGSVGElement>(null);
  const refMm = useRef<Markmap | null>(null);
  const refToolbar = useRef<HTMLDivElement>(null);

  // Efecto para inicializar Markmap y Toolbar una sola vez
  useEffect(() => {
    if (refSvg.current && refToolbar.current && !refMm.current) {
      refMm.current = Markmap.create(refSvg.current);
      renderToolbar(refMm.current, refToolbar.current);
    }
  }, []);

  // Efecto para actualizar Markmap cada vez que cambie el contenido
  useEffect(() => {
    if (refMm.current && content) {
      const { root } = transformer.transform(content);
      refMm.current.setData(root);
      refMm.current.fit();
    }
  }, [content]);

  return (
    <React.Fragment>
      <svg className="flex-1" ref={refSvg} />
      <div className="absolute bottom-1 right-1" ref={refToolbar}></div>
    </React.Fragment>
  );
}
