import React, { Component } from 'react';
import {
	ReactiveBase,
	DataSearch,
	MultiList,
	RangeSlider,
	SingleRange,
	SelectedFilters,
	ResultCard,
	ReactiveList,
} from '@appbaseio/reactivesearch';
import './App.css';

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
				app="MeherLibrary"
				credentials="fGuU6mCJH:ebec80c3-b776-4c73-9358-b59b1721ada4"
			>
				<div className="navbar">
					<div className="logo">
						<b>MEHER DIGITAL LIBRARY</b>
					</div>
					<DataSearch
						className="datasearch"
						componentId="mainSearch"
						dataField={[
							'original_title',
							'original_title.search',
							'authors',
							'authors.search',
						]}
						queryFormat="and"
						placeholder="Search for a book title or an author"
						innerClass={{
							input: 'searchbox',
							list: 'suggestionlist',
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
						
					</div>
					<div className="mainBar">
						<SelectedFilters />
						<ReactiveList
							componentId="results"
							dataField="original_title"
							react={{
								and: [
									'mainSearch',
									'ratingsFilter',
									'publishFilter',
									'authorFilter',
									'languageFilter',
								],
							}}
							pagination
							size={10}

							render={({ data }) => (
								<ReactiveList.ResultCardsWrapper>
									{data.map(item => (
										<ResultCard target="_self" href={item.url} key={item._id}>
											<ResultCard.Image src={item.image} />
											<ResultCard.Title>
												{item.original_title || ' '}
											</ResultCard.Title>
											<ResultCard.Description
												dangerouslySetInnerHTML={{
													__html:
														`<div class='result-author' title='${
															item.authors
														}'>by ${item.authors}</div>`
														+ `<span class="star">${'★'.repeat(
															item.average_rating_rounded,
														)}</span>`,
												}}
											/>
										</ResultCard>
									))}
								</ReactiveList.ResultCardsWrapper>
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
