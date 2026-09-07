import { BUSINESS_LOCATION, SERVICE_RADIUS_MILES } from '~/data/location'
import { useLeaflet } from '~/hooks/useLeaflet'

interface ServiceAreaMapProps {
  className?: string
}

// Farr West, UT coordinates
const CENTER = { lat: BUSINESS_LOCATION.latitude, lng: BUSINESS_LOCATION.longitude }
const RADIUS_MILES = SERVICE_RADIUS_MILES

export function ServiceAreaMap({ className = '' }: ServiceAreaMapProps) {
  const { map, error } = useLeaflet()

  const radiusInMeters = RADIUS_MILES * 1609.344

  if (!map) {
    return (
      <div
        className={`w-full h-full min-h-96 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${className}`}
      >
        <div className="p-6 text-center text-gray-600 dark:text-gray-300" role="status">
          {error ? <a href="https://maps.google.com/?q=3092+North+2000+West+Farr+West+Utah+84404" className="underline">Map could not load. View our location on Google Maps.</a> : 'Loading map...'}
        </div>
      </div>
    )
  }

  const { MapContainer, TileLayer, Circle, Marker, Popup } = map.components

  return (
    <div className={`relative z-0 w-full h-full min-h-96 rounded-lg overflow-hidden ${className}`}>
      <MapContainer
        center={[CENTER.lat, CENTER.lng]}
        zoom={7}
        scrollWheelZoom={false}
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
        <Marker icon={map.icon} position={[CENTER.lat, CENTER.lng]}>
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
