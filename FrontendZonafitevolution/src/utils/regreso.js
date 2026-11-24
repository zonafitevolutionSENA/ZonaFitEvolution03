import { createContext, useContext, useEffect, useRef } from "react";

// Botón de regreso del encabezado: además de las secciones del menú, cada pantalla puede registrar
// sus ventanas internas (un formulario, el registro de huella, la renovación…). Mientras una ventana
// está abierta, la flecha la cierra y deja al usuario en la pantalla de la que venía.
export const RegresoContext = createContext(null);

// `abierta`: si la ventana interna está visible. `cerrar`: cómo volver a la pantalla anterior
// (lo mismo que hace su botón Cancelar o Volver).
export function useRegreso(abierta, cerrar) {
  const contexto = useContext(RegresoContext);
  const cerrarActual = useRef(cerrar);

  useEffect(() => {
    cerrarActual.current = cerrar;
  });

  useEffect(() => {
    if (!abierta || !contexto) return undefined;
    return contexto.registrar(() => cerrarActual.current());
  }, [abierta, contexto]);
}
