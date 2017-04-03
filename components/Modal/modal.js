import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";

/*
The app element allows you to specify the portion of your app that should be hidden (via aria-hidden)
to prevent assistive technologies such as screenreaders from reading content outside of the content of
your modal.  It can be specified in the following ways:

* element
Modal.setAppElement(appElement);

* query selector - uses the first element found if you pass in a class.
Modal.setAppElement('#your-app-element');

*/

const customStyles = {
  content: {
    top: "8%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

class modal extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      description: "",
      url: ""
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }
  componentDidMount() {
    Modal.setAppElement(".App");
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.refs.subtitle.style.color = "#f00";
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }
  handleInputChange(event) {
    const target = event.target;
    //debugger;
    switch (target.id) {
      case "url":
        this.setState({
          url: this.state.url + event.target.value
        });
        break;
      case "description":
        this.setState({
          url: this.state.description + event.target.value
        });
        break;
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.openModal}>Add Image</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2 ref="subtitle">Hello</h2>
          <button onClick={this.closeModal}>close</button>
          <div>I am a modal</div>
          <form>
            <ul>
              <li>
                <label htmlFor="url">Url</label>
                <input
                  id="url"
                  name="url"
                  value={this.state.url}
                  onChange={e => this.handleInputChange(e)}
                  type="text"
                  maxLength="10"
                />
              </li>
              <li>
                <label htmlFor="description">description</label>
                <input
                  id="description"
                  name="description"
                  value={this.state.description}
                  onChange={e => this.handleInputChange(e)}
                  type="text"
                  maxLength="10"
                />
              </li>
            </ul>
          </form>
        </Modal>
      </div>
    );
  }
}

export default modal;
