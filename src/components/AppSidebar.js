//frontend_AcademiA\src\components\AppSidebar.js

// Importamos Hooks necesarios para el control del sidebar
import React, { useRef, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,

} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logo } from 'src/assets/brand/logo'
import { sygnet } from 'src/assets/brand/sygnet'

// sidebar nav config
// import navigation from '../_nav'
import getNavItems from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  //  Referencia para detectar el área del sidebar
  const sidebarRef = useRef()
  console.log('AppSidebar: Estado inicial - unfoldable=', unfoldable, 'sidebarShow=', sidebarShow); // Depura estado inicial

  // Cerrar al hacer clic fuera de la barra (Click Outside)
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Si el sidebar está visible, existe la referencia, y el clic NO fue dentro del sidebar
      if (sidebarShow && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        // Opcional: Verificar que el clic no sea en el botón de hamburguesa del Header 
        // (si tienes esa clase, agrégala a la condición para evitar conflictos)
        dispatch({ type: 'set', sidebarShow: false })
      }
    }

    // Agregamos el listener al documento
    document.addEventListener('mousedown', handleClickOutside)

    // Limpieza del listener al desmontar
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [sidebarShow, dispatch])

  // Lógica para cerrar al seleccionar una opción del menú
  const handleNavClick = (event) => {
    // Verificamos si el elemento clickeado (o su ancestro) es un link de navegación (.nav-link)
    // Esto evita que se cierre si haces clic en un espacio vacío o en un scrollbar
    if (event.target.closest('.nav-link')) {
      dispatch({ type: 'set', sidebarShow: false })
    }
  }


  return (

    <CSidebar
      className="border-end sidebar"    // Borde derecho del sidebar
      colorScheme="dark"    // Tema oscuro como el template
      position="fixed"    // Sidebar fijo
      unfoldable={unfoldable}   // Controla colapsado/expandido
      visible={sidebarShow}   // Muestra/oculta sidebar
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })   // Actualiza estado en Redux
        console.log('AppSidebar: Cambiando sidebarShow a', visible); // Depura cambio

      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/">
          <CIcon customClassName="sidebar-brand-full" icon={logo} height={32} />
          <CIcon customClassName="sidebar-brand-narrow" icon={sygnet} height={32} />
        </CSidebarBrand>

        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>

      {/* Envolvemos la navegación en un div (o lo aplicamos directo) para capturar el clic */}
      <div onClick={handleNavClick}>
        <AppSidebarNav items={getNavItems()} />
      </div>

      <CSidebarFooter className="border-top d-none d-md-flex">
        <CSidebarToggler
          onClick={() => {
            const newUnfoldable = !unfoldable; // Calcula nuevo estado
            dispatch({ type: 'set', sidebarUnfoldable: newUnfoldable })  // Actualiza Redux
            console.log('AppSidebar: Cambiando unfoldable a', newUnfoldable); // Depura cambio
          }}
        />
      </CSidebarFooter>

    </CSidebar>
  )
}

export default React.memo(AppSidebar)
