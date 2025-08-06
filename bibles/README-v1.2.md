# Bible Directory v1.2 - Enhanced Audio Version Selection

## 🎵 New Features

### Audio Version Dropdown Selection
- **Multiple Audio Versions**: Each Bible translation now supports multiple audio versions
- **Narrator Selection**: Choose from different narrators for the same Bible version
- **Audio Quality Options**: Select different audio quality levels (32k, 64k, etc.)
- **Duration Information**: See audio duration for each version before playing

### Enhanced Audio Controls
- **Real-time Version Switching**: Switch audio versions without reloading
- **Advanced Playback Controls**: Volume, mute, seek, and stop functionality
- **Audio State Management**: Proper handling of audio state across version switches
- **Error Handling**: Graceful error handling for unavailable audio

### Improved User Experience
- **Settings Icon**: Easy access to audio version selection via settings gear
- **Visual Indicators**: Clear indication of available audio versions
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Loading States**: Proper loading indicators during audio fetching

## 🏗️ Technical Implementation

### New Components

#### `AudioVersionSelector`
- Dropdown interface for selecting audio versions
- Displays narrator, quality, and duration information
- Auto-selects default audio version
- Handles loading and error states

#### `AudioPlayerV2`
- Enhanced audio player with version selection
- Integrated with `AudioVersionSelector`
- Advanced playback controls
- Real-time audio state management

#### `VerseComparisonV2`
- Updated verse comparison component
- Supports multiple selected versions
- Integrated audio players for each version
- Chapter-based audio reference conversion

### API Routes

#### `/api/audio-versions/[bibleVersionId]`
- Returns available audio versions for a specific Bible version
- Includes narrator, quality, and duration information
- Supports default version selection

### Data Flow

1. **Version Selection**: User selects Bible versions to compare
2. **Audio Version Fetching**: System fetches available audio versions for each Bible version
3. **Audio Version Selection**: User selects preferred audio version via dropdown
4. **Audio Playback**: Selected audio version plays with full controls

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Next.js 15
- YouVersion API access (for real audio)

### Installation
```bash
npm install
npm run dev
```

### Usage

1. **Browse Bible Versions**: Use the existing Bible Directory interface
2. **Select a Version**: Click on any Bible version to view details
3. **Compare Verses**: Use the "Compare Verses" section on the version page
4. **Select Audio Versions**: Click the ⚙️ settings icon on any audio player
5. **Choose Audio Version**: Select your preferred narrator and quality
6. **Play Audio**: Enjoy enhanced audio playback with full controls

## 📁 File Structure

```
src/
├── components/
│   ├── audio-version-selector.tsx    # Audio version dropdown
│   ├── audio-player-v2.tsx           # Enhanced audio player
│   └── verse-comparison.tsx          # Updated with v1.2 features
├── app/
│   └── api/
│       ├── audio/
│       │   └── [versionId]/
│       │       └── [reference]/
│       │           └── route.ts      # Audio API proxy
│       └── audio-versions/
│           └── [bibleVersionId]/
│               └── route.ts          # Audio versions API
└── lib/
    └── youversion-audio-api.ts       # YouVersion audio API integration
```

## 🔧 Configuration

### Audio Version API
The audio versions API currently returns mock data. To integrate with real YouVersion API:

1. Update `/api/audio-versions/[bibleVersionId]/route.ts`
2. Replace mock data with YouVersion API calls
3. Configure proper authentication and rate limiting

### Audio Player Settings
- Default volume: 1.0
- Supported audio formats: MP3
- Quality options: 32k, 64k, 128k
- Auto-play: Disabled (user must click play)

## 🎯 Key Features

### Audio Version Selection
```typescript
interface AudioVersion {
  id: number
  title: string
  narrator: string
  language: string
  quality: string
  duration: string
  default: boolean
}
```

### Enhanced Audio Player
- **Play/Pause**: Standard playback controls
- **Stop**: Reset to beginning
- **Volume Control**: 0-100% volume slider
- **Mute Toggle**: Quick mute/unmute
- **Seek Bar**: Click to jump to specific time
- **Time Display**: Current time / total duration

### Version Comparison
- **Multiple Versions**: Compare up to 6 versions simultaneously
- **Audio Availability**: Visual indicators for available audio
- **Chapter-based Audio**: Automatic conversion to chapter format
- **Real-time Switching**: Change audio versions without page reload

## 🔮 Future Enhancements

### Planned Features
- **Playlist Support**: Create and save audio playlists
- **Speed Control**: Adjust playback speed (0.5x - 2x)
- **Crossfade**: Smooth transitions between audio versions
- **Offline Support**: Download audio for offline listening
- **Bookmarking**: Save favorite audio versions

### Technical Improvements
- **Caching**: Implement audio caching for better performance
- **Progressive Loading**: Stream audio for faster playback
- **Analytics**: Track audio usage and preferences
- **Accessibility**: Enhanced screen reader support

## 🐛 Known Issues

1. **Mock Data**: Audio versions API currently returns mock data
2. **CORS**: May need proxy setup for YouVersion API
3. **Mobile Audio**: Some mobile browsers have audio autoplay restrictions
4. **Network Issues**: Audio loading may fail on slow connections

## 📝 Changelog

### v1.2.0 (Current)
- ✅ Audio version dropdown selection
- ✅ Multiple narrator support
- ✅ Audio quality selection
- ✅ Enhanced playback controls
- ✅ Real-time version switching
- ✅ Improved error handling
- ✅ Responsive design improvements

### v1.1.0 (Previous)
- ✅ Basic YouVersion audio integration
- ✅ Audio player with controls
- ✅ Chapter-based audio fetching
- ✅ Audio availability indicators

### v1.0.0 (Initial)
- ✅ Bible version browsing
- ✅ Search and filtering
- ✅ Version comparison
- ✅ Basic audio support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/v1.3`)
3. Commit your changes (`git commit -am 'Add v1.3 feature'`)
4. Push to the branch (`git push origin feature/v1.3`)
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Bible Directory v1.2** - Enhanced audio experience for Bible study and comparison. 