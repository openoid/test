import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
	ReactiveBase,
	DataSearch,
	MultiList,
	RangeSlider,
	SingleRange,
	SelectedFilters,
	ResultCard,
	ReactiveList,
	ResultList
} from '@appbaseio/reactivesearch';
import './App.css';

const { ResultListWrapper } = ReactiveList;

/*
const FilePathEpub = "http://localhost:8001/ebook-library/cloud-reader/index.html?epub=files/epub/";
const FilePathPdf = "http://localhost:8001/ebook-library/cloud-reader/files/pdf/";
const FilePathImage = "http://localhost:8001/ebook-library/cloud-reader/files/cover/";
*/

const FilePathEpub = "https://mdf.cloudamo.com/ebook-library/cloud-reader/index.html?epub=files/epub/";
const FilePathPdf = "https://mdf.cloudamo.com/ebook-library/cloud-reader/files/pdf/";
const FilePathImage = "https://mdf.cloudamo.com/ebook-library/cloud-reader/files/cover/";

/*https://mdf.cloudamo.com/index.php/s
*/

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
		};
	}

	toggleState = () => {
		const { visible } = this.state;
		this.setState({
			visible: !visible,
		});
	};

	render() {
		return (
			<ReactiveBase

				app="NewApp1"
				credentials="iDqR3laJo:5e529314-8ddc-44b9-916b-3c7545de16b6"
			>
				<div className="navbar">
					<div className="logo">
						<b>MEHER DIGITAL LIBRARY (Source: MDF)</b>
					</div>
					
				  <DataSearch
					className="datasearch"
					componentId="mainSearch"
					dataField={[
					  "original_title",
					  "original_title.search",
					  "authors",
					  "authors.search"
					]}
					queryFormat="and"
					placeholder="Search for a book title or an author"
					innerClass={{
					  input: "searchbox",
					  list: "suggestionlist"
					}}
					autosuggest={false}
					iconPosition="left"
					filterLabel="search"
				  />
						
			

				</div>
				<div className="display">
					<div className={`leftSidebar ${this.state.visible ? 'active' : ''}`}>

						<MultiList
						  componentId="authorFilter"
						  dataField="authors.keyword"
						  size={100}
						  showCheckbox={false}
						  style={{
							marginBottom: 20
						  }}
						  title="Authors"
						  innerClass={{
							list: 'author-list',
						  }}
						  placeholder="Filter by author name"
						  filterLabel="Authors"
						/>
						<MultiList
						  componentId="languageFilter"
						  dataField="language_code.keyword"
						  showCheckbox={false}
						  size={100}
						  style={{
							marginBottom: 20
						  }}
						  title="Language"
						/>
						<MultiList
						  componentId="journalFilter"
						  dataField="Journal.keyword"
						  queryFormat="and"
						  showCheckbox={false}
						  size={100}
						  sortBy="asc"
						  style={{
							marginBottom: 20
						  }}
						  title="Journals"
						/>
						
					</div>
					<div className="mainBar">
						<SelectedFilters />
						<ReactiveList
							componentId="results"
							dataField="original_title"
							react={{
								and: [
									'mainSearch',
									'authorFilter',
									'languageFilter',
									'journalFilter',
								],
							}}
							pagination
							size={10}

							render={({ data }) => (
							<ResultListWrapper>
										{
											data.map(item => (
												<ResultList  target=""  href= {item.url ? FilePathEpub + item.url : FilePathPdf + item.pdf_url} key={item._id}>
													<ResultList.Image small src={FilePathImage + item.image} />
													<ResultList.Content>
														<ResultList.Description>
														{item.url && 
															<div>
																<div><b>{item.original_title}</b></div>
																<div>by {item.authors}
																	<a href= {FilePathEpub + item.url} class="btn btn-link" role="button">Read</a>
																	
																</div>
																<div> 
																	<a href= {FilePathPdf + item.pdf_url} class="btn btn-link" role="button">Download</a> 
																</div>
															</div>
														}
														{!item.url && 
															<div>
																<div><b>{item.original_title}</b></div>
																<div>by {item.authors}</div>
																<a href= {FilePathPdf + item.pdf_url} class="btn btn-link" role="button">Download</a>
															</div>
														}

														</ResultList.Description>
													</ResultList.Content>
												</ResultList>
											))
										}
							</ResultListWrapper>

							)}
							className="result-data"
							innerClass={{
								title: 'result-title',
								image: 'result-image',
								resultStats: 'result-stats',
								listItem: 'result-item',
							}}
						/>
					</div>
					<div
						role="button"
						tabIndex="0"
						onKeyPress={this.toggleState}
						onClick={this.toggleState}
						className={`toggle-btn ${this.state.visible ? 'active' : ''}`}
					>
						{this.state.visible ? '📚  Show Books' : '📂  Show Filters'}
					</div>
				</div>
			</ReactiveBase>
		);
	}
}

export default App;
