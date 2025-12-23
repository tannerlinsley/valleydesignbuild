import { useLeaflet } from '~/hooks/useLeaflet'

interface ServiceAreaMapProps {
  className?: string
}

// Farr West, UT coordinates
const CENTER = { lat: 41.2061, lng: -112.0272 }
const RADIUS_MILES = 80

export function ServiceAreaMap({ className = '' }: ServiceAreaMapProps) {
  const { isLoaded, components } = useLeaflet()
  const { MapContainer, TileLayer, Circle, Marker, Popup } = components

  const radiusInMeters = RADIUS_MILES * 1609.344

  if (!isLoaded) {
    return (
      <div
        className={`w-full h-full min-h-96 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${className}`}
      >
        <div className="text-gray-500 dark:text-gray-400">Loading map...</div>
      </div>
    )
  }

  return (
    <div className={`relative z-0 w-full h-full min-h-96 rounded-lg overflow-hidden ${className}`}>
      <MapContainer
        center={[CENTER.lat, CENTER.lng]}
        zoom={7}
        style={{ height: '100%', width: '100%', minHeight: '400px' }}
        className="rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Service area circle */}
        <Circle
          center={[CENTER.lat, CENTER.lng]}
          radius={radiusInMeters}
          pathOptions={{
            fillColor: '#0891b2',
            fillOpacity: 0.12,
            color: '#0891b2',
            weight: 2,
          }}
        />

        {/* Center marker */}
        <Marker position={[CENTER.lat, CENTER.lng]}>
          <Popup>
            <div className="text-center p-1">
              <strong className="text-gray-900">Valley Design Build</strong>
              <br />
              <span className="text-gray-600">3092 N 2000 W, Farr West, UT</span>
              <br />
              <span className="text-cyan-600 font-medium">
                80-mile service area
              </span>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
