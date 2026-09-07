import { useEffect, useState } from 'react'
import type { Icon } from 'leaflet'
import type * as ReactLeaflet from 'react-leaflet'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

type LeafletComponents = Pick<typeof ReactLeaflet, 'MapContainer' | 'TileLayer' | 'Circle' | 'Marker' | 'Popup'>

export function useLeaflet() {
  const [map, setMap] = useState<{ components: LeafletComponents; icon: Icon } | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true
    Promise.all([
      import('react-leaflet'),
      import('leaflet'),
      import('leaflet/dist/leaflet.css'),
    ]).then(([components, leaflet]) => {
      if (!active) return
      setMap({
        components,
        icon: leaflet.icon({
          iconUrl: markerIcon,
          iconRetinaUrl: markerIconRetina,
          shadowUrl: markerShadow,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        }),
      })
    }).catch(() => {
      if (active) setError(true)
    })
    return () => { active = false }
  }, [])

  return { map, error }
}
