import React, { useState } from 'react';
import { Users, MapPin, Calendar, Home, User, Key, Heart, MessageCircle, UserPlus, Filter } from 'lucide-react';

const App = () => {
  const [currentTab, setCurrentTab] = useState('discover');
  const [currentLocation, setCurrentLocation] = useState('New York, NY');
  const [showLocationModal, setShowLocationModal] = useState(false);

  // Sample data
  const sampleProfiles = [
    {
      id: 1,
      name: 'Sarah Chen',
      age: 24,
      profession: 'Software Engineer',
      city: 'New York, NY',
      interests: ['Coffee', 'Hiking', 'Photography'],
      connectionPath: ['You', 'Mike Johnson', 'Sarah Chen'],
      connectionDistance: 2,
      lookingForRoommate: false,
      rentBudget: null,
      habits: null,
      image: '👩‍💻'
    },
    {
      id: 2,
      name: 'Alex Rodriguez',
      age: 23,
      profession: 'Marketing Coordinator',
      city: 'New York, NY',
      interests: ['Basketball', 'Cooking', 'Gaming'],
      connectionPath: ['You', 'Jessica Park', 'Tom Wilson', 'Alex Rodriguez'],
      connectionDistance: 3,
      lookingForRoommate: true,
      rentBudget: '$1200-1500',
      habits: ['Early bird', 'Clean', 'Social'],
      image: '👨‍💼'
    },
    {
      id: 3,
      name: 'Emma Thompson',
      age: 25,
      profession: 'Graphic Designer',
      city: 'New York, NY',
      interests: ['Art', 'Music', 'Travel'],
      connectionPath: ['You', 'David Lee', 'Emma Thompson'],
      connectionDistance: 2,
      lookingForRoommate: true,
      rentBudget: '$1000-1300',
      habits: ['Night owl', 'Creative', 'Quiet'],
      image: '👩‍🎨'
    }
  ];

  const sampleEvents = [
    {
      id: 1,
      title: 'Coffee & Networking',
      date: '2025-07-20',
      time: '10:00 AM',
      location: 'Central Park Cafe',
      organizer: 'Mike Johnson',
      attendees: 12,
      description: 'Casual coffee meetup for new professionals in the area'
    },
    {
      id: 2,
      title: 'Weekend Hiking Group',
      date: '2025-07-22',
      time: '8:00 AM',
      location: 'Hudson River Park',
      organizer: 'Sarah Chen',
      attendees: 8,
      description: 'Morning hike followed by brunch'
    }
  ];

  const ConnectionPath = ({ path, distance }) => (
    <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
      <Users className="w-4 h-4" />
      <span>{distance} connection{distance > 1 ? 's' : ''} away:</span>
      <div className="flex items-center gap-1">
        {path.map((person, index) => (
          <React.Fragment key={index}>
            <span className={index === 0 ? 'text-yellow-600 font-medium' : 'text-gray-800'}>
              {person}
            </span>
            {index < path.length - 1 && <span className="text-gray-400">→</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  const ProfileCard = ({ profile }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-4">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-4xl">{profile.image}</div>
            <div>
              <h3 className="font-semibold text-lg">{profile.name}, {profile.age}</h3>
              <p className="text-gray-600">{profile.profession}</p>
            </div>
          </div>
          {profile.lookingForRoommate && (
            <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
              Looking for Roommate
            </div>
          )}
        </div>
        
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 mb-2">
            {profile.interests.map((interest, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                {interest}
              </span>
            ))}
          </div>
        </div>

        {profile.lookingForRoommate && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-sm mb-2">Roommate Info</h4>
            <p className="text-sm text-gray-600">Budget: {profile.rentBudget}</p>
            <p className="text-sm text-gray-600">Habits: {profile.habits?.join(', ')}</p>
          </div>
        )}

        <ConnectionPath path={profile.connectionPath} distance={profile.connectionDistance} />
        
        <div className="flex gap-2 mt-4">
          <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Connect
          </button>
          <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const EventCard = ({ event }) => (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {event.date} at {event.time}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {event.location}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">Organized by</div>
          <div className="font-medium">{event.organizer}</div>
        </div>
      </div>
      
      <p className="text-gray-700 mb-4">{event.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          {event.attendees} attending
        </div>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors">
          Join Event
        </button>
      </div>
    </div>
  );

  const LocationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">Change Location</h3>
        <input
          type="text"
          placeholder="Enter city, state"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          defaultValue={currentLocation}
        />
        <div className="flex gap-2">
          <button
            onClick={() => setShowLocationModal(false)}
            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => setShowLocationModal(false)}
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentTab) {
      case 'discover':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Discover People</h2>
              <button className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
            
            <div className="space-y-4">
              {sampleProfiles.map(profile => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          </div>
        );
      
      case 'events':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Events</h2>
              <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                Create Event
              </button>
            </div>
            
            <div className="space-y-4">
              {sampleEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        );
      
      case 'roommates':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Find Roommates</h2>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Update Roommate Preferences
              </button>
            </div>
            
            <div className="space-y-4">
              {sampleProfiles.filter(p => p.lookingForRoommate).map(profile => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          </div>
        );
      
      case 'profile':
        return (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-6xl">👤</div>
                <div>
                  <h2 className="text-2xl font-semibold">Your Profile</h2>
                  <p className="text-gray-600">Software Engineer • 24 years old</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Technology', 'Reading', 'Rock Climbing', 'Photography'].map((interest, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Location</h3>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {currentLocation}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Looking for Roommate</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Budget: $1100-1400</p>
                    <p className="text-sm text-gray-600">Habits: Early bird, Clean, Quiet</p>
                  </div>
                </div>
                
                <button className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Key className="w-8 h-8 text-yellow-500" />
              <h1 className="text-2xl font-bold text-gray-900">Connect</h1>
            </div>
            
            <button
              onClick={() => setShowLocationModal(true)}
              className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <MapPin className="w-4 h-4" />
              {currentLocation}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            {[
              { id: 'discover', label: 'Discover', icon: Users },
              { id: 'events', label: 'Events', icon: Calendar },
              { id: 'roommates', label: 'Roommates', icon: Home },
              { id: 'profile', label: 'Profile', icon: User }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setCurrentTab(id)}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  currentTab === id
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {renderContent()}
      </main>

      {/* Location Modal */}
      {showLocationModal && <LocationModal />}
    </div>
  );
};

export default App;