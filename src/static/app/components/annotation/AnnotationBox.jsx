import React from 'react';
import AnnotationAPI from '../../api/AnnotationAPI.js';
import AnnotationCreator from './AnnotationCreator.jsx';
import AnnotationList from './AnnotationList.jsx';
import FlexModal from '../FlexModal.jsx';

//TODO dependancy on jquery!! fix this later

class AnnotationBox extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			annotation : null,
			annotations: [],
			showModal : false
		};
	}

	loadCommentsFromServer() {
		$.ajax({
			url : _config.ANNOTATION_API_BASE + '/annotation',
			type : 'GET',
			success: function(data) {
				this.setState(data);
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	}

	addAnnotation() {
		this.setState({
			annotation : null
		}, this.handleShowModal.bind(this))
	}

	setAnnotation(annotation) {
		console.debug('Setting annotation');
		this.setState({
			annotation : annotation
		})
	}

	//TODO neatly tie in with the player via an access object
	playAnnotation(annotation) {
		console.debug('Playing annotation');
		this.props.player.seek(annotation.start);
	}

	saveAnnotation(annotation) {
		AnnotationAPI.saveAnnotation(annotation, function(data) {
			this.onSave(data);
		}.bind(this));
	}

	onSave(annotation) {
		var annotations = this.state.annotations;
		annotations.push(annotation);
		$('#annotation__modal').modal('hide');
		this.setState({annotations : annotations});
	}

	deleteAnnotation(annotationId) {
		AnnotationAPI.deleteAnnotation(annotationId, function(data) {
			this.onDelete(annotationId);
		}.bind(this));
	}

	onDelete(annotationId) {
		var annotations = $.grep(this.state.annotations, function(e){
			return e.annotationId != annotationId;
		});
		this.setState({annotations : annotations});
	}

	componentDidMount() {
		this.loadCommentsFromServer();
	}

	handleShowModal() {
		this.setState({showModal: true})
	}

	handleHideModal() {
		this.setState({showModal: false})
	}

	//TODO rewrite with flexmodal
	//TODO pass along the save & delete functions
	render() {
		return (
			<div className="commentBox">
				<h3>Saved annotations</h3>
				<AnnotationList
					activeAnnotation={this.state.annotation}
					annotations={this.state.annotations}
					setAnnotation={this.setAnnotation.bind(this)}
					playAnnotation={this.playAnnotation.bind(this)}
					editAnnotation={this.handleShowModal.bind(this)}
					deleteAnnotation={this.deleteAnnotation.bind(this)}/>
				<button type="button" className="btn btn-info" onClick={this.addAnnotation.bind(this)}>
					Add annotation
				</button>

				{this.state.showModal ?
					<FlexModal
						elementId="annotation__modal"
						handleHideModal={this.handleHideModal.bind(this)}
						title="Add annotation">
						<AnnotationCreator
							annotation={this.state.annotation}
							saveAnnotation={this.saveAnnotation.bind(this)}/>
					</FlexModal>: null
				}
			</div>
		);
	}
};

export default AnnotationBox;