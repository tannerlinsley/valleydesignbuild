import { useEffect, useState } from 'react'

let MapContainer: any
let TileLayer: any
let Circle: any
let Marker: any
let Popup: any

export interface LeafletComponents {
  MapContainer: any
  TileLayer: any
  Circle: any
  Marker: any
  Popup: any
}

export function useLeaflet() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      Promise.all([
        import('react-leaflet'),
        import('leaflet'),
        import('leaflet/dist/leaflet.css'),
      ]).then(([reactLeaflet, L]) => {
        MapContainer = reactLeaflet.MapContainer
        TileLayer = reactLeaflet.TileLayer
        Circle = reactLeaflet.Circle
        Marker = reactLeaflet.Marker
        Popup = reactLeaflet.Popup

        delete (L.default.Icon.Default.prototype as any)._getIconUrl
        L.default.Icon.Default.mergeOptions({
          iconRetinaUrl:
            'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl:
            'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl:
            'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        })

        setIsLoaded(true)
      })
    }
  }, [])

  return {
    isLoaded,
    components: {
      MapContainer,
      TileLayer,
      Circle,
      Marker,
      Popup,
    } as LeafletComponents,
  }
}
