import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import _ from 'lodash'

import YouTubeSearch from 'youtube-api-search'

import SearchBar from './components/search_bar'
import VideoList from './components/video_list'
import VideoDetail from './components/video_detail'

const API_KEY = 'AIzaSyC-eHHE5A-LgBeV-6PeQJJG6ZJ8nknQG4M'

class App extends Component {

	constructor(props){
		super(props)

		this.state = {
			videos: [],
			selectedVide: null
		}

		this.videoSearch('dog')
		
	}

	videoSearch(term){
		YouTubeSearch({ key: API_KEY, term: term }, (videos) => {
			this.setState({
				videos: videos,
				selectedVideo: videos[0]
			})
		})

	}

	render() {
		const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 500);
		
		return (
			<div>
				<SearchBar onSearchTermChange={videoSearch} />
				<VideoDetail video={ this.state.selectedVideo } />
				<VideoList 
					onVideoSelect={ selectedVideo => this.setState({selectedVideo}) }
					videos={ this.state.videos } />
			</div>
		)
	}
}

ReactDOM.render(<App />, document.querySelector('.container'))