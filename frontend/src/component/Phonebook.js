import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Modal, Form, List, Image, Message, Header, Portal, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Select from 'react-select';
import MessengerCustomerChat from 'react-messenger-customer-chat';

const moment = require('moment');
const axios = require('axios');
import { apihost } from '../apihost';

// Components
import PhonebookLoader from './Loader';

const styles = {
  header: {
    textAlign: 'center',
    fontSize: 30
  },
  card: {
    width: "100vh",
    margin: "0 auto",
    marginTop: 50,
  },
  scrollableContent: {
    minHeight: 740,
    maxHeight: 740,
    overflowY: 'auto',
    margin: '0 auto'
  },
  noContact: {
    textAlign: 'center',
    fontSize: '300%',
    color: '#DCDCDC'
  },

}

const customSelectStyle = {
  control: base => ({
    ...base,
    height: 42,
    minHeight: 42,
    borderRadiusTopRight: 0,
    borderRadiusBottomRight: 0,
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? 'white' : 'black',
    padding: 20,
  }),
};

const Phonebook = () => {
  const [fetchedData, setFetchedData] = useState(null);
  const [modalSave, setModalSave] = useState(false);
  const [delModal, setDelModal] = useState(false);
  const [delSuccess, setDelSuccess] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [id, setId] = useState(-1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthDate] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(false);
  const [errNameMsg, setErrNameMsg] = useState("");
  const [errEmailMsg, setErrEmailMsg] = useState("");
  const [errBirthDateMsg, setErrBirthDateMsg] = useState("");
  const [errContactMsg, setErrContactMsg] = useState("");
  const [errAddressMsg, setErrAddressMsg] = useState("");
  const [errImageMsg, setErrImageMsg] = useState("");
  const [errStatus, setErrStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [infoModal, setInfoModal] = useState(false);

  useEffect(() => {
    var route = selectedContact !== null ? `api/phonebook/${selectedContact.value}/` : 'api/phonebook/';
    var url = apihost + route;

    axios.get(url)
      .then(function (response) {
        // handle success
        if (Array.isArray(response.data)) {
          setFetchedData(response.data);
        } else {
          var obj = [];
          obj.push(response.data);
          setFetchedData(obj);
        }
        setTimeout(() => setLoading(false), 3000)
      })
      .catch(function (error) {
        // handle error
        setTimeout(() => setLoading(false), 3000)
      })
      .finally(function () {
        // always executed
      });
  }, [fetchedData]);

  const contactList = fetchedData ? fetchedData.map(x => ({
    id: x.id,
    Name: x.Name,
    ContactNumber: x.ContactNumber,
    Email: x.Email,
    BirthDate: x.BirthDate,
    Address: x.Address,
    Image: x.Image
  })) : [];

  const onSave = (method) => {
    var route = method !== 'put' ? 'api/phonebook/' : `api/phonebook/${id}/`;
    var url = apihost + route;
    const data = new FormData();
    data.append('id', id);
    data.append('Name', name);
    data.append('ContactNumber', contactNumber);
    data.append('Email', email);
    data.append('BirthDate', birthdate);
    data.append('Address', address);
    if (image !== null)
      data.append('Image', image, image.name)

    if (method === 'post') {
      axios
        .post(url, data)
        .then(res => {
          setModalSave(false);
          setId(-1);
          setName("");
          setContactNumber("");
          setEmail("");
          setBirthDate("");
          setAddress("");
          setImage(null);
          setError(false);
          setErrNameMsg("");
          setErrContactMsg("");
          setErrEmailMsg("");
          setErrBirthDateMsg("");
          setErrAddressMsg("");
          setErrImageMsg("");
        })
        .catch(err => {
          const errors = {
            msg: err.response.data,
            status: err.response.status
          }
          setError(true);
          setErrStatus(errors.status);
          if (errors.msg.Name) setErrNameMsg(`Name: ${errors.msg.Name.join()}`);
          if (errors.msg.Email) setErrEmailMsg(`Email: ${errors.msg.Email.join()}`);
          if (errors.msg.ContactNumber) setErrContactMsg(`Contact: ${errors.msg.ContactNumber.join()}`);
          if (errors.msg.BirthDate) setErrBirthDateMsg(`Birthday: ${errors.msg.BirthDate.join()}`);
          if (errors.msg.Address) setErrAddressMsg(`Address: ${errors.msg.Address.join()}`);
          if (errors.msg.Image) setErrImageMsg(`Image: ${errors.msg.Image.join()}`);
        })
    } else {
      axios
        .put(url, data)
        .then(res => {
          setModalSave(false);
          setId(-1);
          setName("");
          setContactNumber("");
          setEmail("");
          setBirthDate("");
          setAddress("");
          setImage(null);
          setError(false);
          setErrNameMsg("");
          setErrContactMsg("");
          setErrEmailMsg("");
          setErrBirthDateMsg("");
          setErrAddressMsg("");
          setErrImageMsg("");
        })
        .catch(err => {
          const errors = {
            msg: err.response.data,
            status: err.response.status
          }
          setError(true);
          setErrStatus(errors.status);
          if (errors.msg.Name) setErrNameMsg(`Name: ${errors.msg.Name.join()}`);
          if (errors.msg.Email) setErrEmailMsg(`Email: ${errors.msg.Email.join()}`);
          if (errors.msg.ContactNumber) setErrContactMsg(`Contact: ${errors.msg.ContactNumber.join()}`);
          if (errors.msg.BirthDate) setErrBirthDateMsg(`Birthday: ${errors.msg.BirthDate.join()}`);
          if (errors.msg.Address) setErrAddressMsg(`Address: ${errors.msg.Address.join()}`);
          if (errors.msg.Image) setErrImageMsg(`Image: ${errors.msg.Image.join()}`);
        })
    }
  }

  const onDelete = () => {
    var url = apihost + `api/phonebook/${id}/`;
    axios
      .delete(url)
      .then(res => {
        setModalSave(false);
        setDelModal(false);
        setDelSuccess(true);
        setId(-1);
        setName("");
        setContactNumber("");
        setEmail("");
        setBirthDate("");
        setImage(null);
      })
      .catch(err => console.log(err.response.data))
  }

  function ContactOption(item) {
    var list = [];
    if (item !== undefined) {
      item.map(x => {
        var name = x.Name;

        return (
          list.push({
            label: name,
            value: x.id
          }))
      })
    }
    return list;
  }

  const cancelModal = () => {
    setModalSave(false);
    setId(-1);
    setName("");
    setContactNumber("");
    setEmail("");
    setBirthDate("");
    setAddress("");
    setImage(null);
    setError(false);
    setErrNameMsg("");
    setErrContactMsg("");
    setErrEmailMsg("");
    setErrBirthDateMsg("");
    setErrAddressMsg("");
    setErrImageMsg("");
  }

  const cancelDelModal = () => {
    setDelModal(false);
    setId(-1);
    setName("");
    setContactNumber("");
    setEmail("");
    setBirthDate("");
    setAddress("");
    setImage(null);
    setError(false);
    setErrNameMsg("");
    setErrContactMsg("");
    setErrEmailMsg("");
    setErrBirthDateMsg("");
    setErrAddressMsg("");
    setErrImageMsg("");
  }

  const openDelModal = (id) => {
    setDelModal(true);
    setId(id);
  }

  const onEdit = (param) => {
    setModalSave(true);
    setId(param.id);
    setName(param.Name);
    setContactNumber(param.ContactNumber);
    setEmail(param.Email);
    setBirthDate(param.BirthDate);
    setAddress(param.Address);
  }

  return (

    <div style={{ width: '100%', scrollBehavior: 'smooth' }}>
      <Card style={styles.card}>
        <Card.Content>
          <Card.Header style={styles.header}>Contact</Card.Header>
          <div style={{ width: 250, zIndex: 100, marginLeft: 5, float: 'right' }}>
            <Select
              defaultValue={selectedContact}
              options={ContactOption(contactList)}
              onChange={e => setSelectedContact(e)}
              isClearable
              placeholder='Search...'
              theme={(theme) => ({
                ...theme,
                // borderRadius: 0,
                colors: {
                  ...theme.colors,
                  // text: 'black',
                  primary25: '#66c0f4',
                  primary: '#B9B9B9'
                },
              })}
              styles={customSelectStyle}
            />
          </div>
          <Button floated='right' size='large' content='Add' style={{ marginRight: 5 }} onClick={() => setModalSave(true)} />
          <Button floated='right' size='large' content='Info' style={{ marginRight: 5 }} onClick={() => setInfoModal(true)} />
        </Card.Content>
        <Card.Content>
          <Card.Content style={styles.scrollableContent}>
            <Card.Group style={{ margin: '0 auto', marginLeft: 20 }}>
              {loading !== true && contactList.map(x =>
                <Card id={x.id} key={x.id}>
                  <Card.Content>
                    <Image avatar size='massive' floated='right' src={x.Image} />
                    <Card.Header>{x.Name}</Card.Header>
                    <Card.Meta><strong>{x.ContactNumber}</strong></Card.Meta>
                    <Card.Meta>{'Email: ' + x.Email}</Card.Meta>
                    <Card.Meta>{'Birthday: ' + moment(x.BirthDate).format('MMMM DD, YYYY')}</Card.Meta>
                    <Card.Meta>{'Address: ' + x.Address}</Card.Meta>
                  </Card.Content>
                  <Card.Content extra>
                    <div className='ui two buttons'>
                      {<Button basic color='grey' onClick={() => onEdit(x)}>Edit</Button>}
                      <Button basic color='grey' onClick={() => openDelModal(x.id)}>Delete</Button>
                    </div>
                  </Card.Content>
                </Card>
              )}
              {loading === true &&
                <PhonebookLoader />
              }
            </Card.Group>

            {contactList === null || contactList.length === 0 &&
              <List style={{ alignItems: 'center', justifyContent: 'center' }}>
                <br /><br /><br /><br /><br /><br /><br />
                <List.Header style={styles.noContact}><b>{"No contact found"}</b></List.Header>
                <br /><br /><br /><br /><br /><br /><br />
              </List>
            }
          </Card.Content>
        </Card.Content>
        <Card.Content>
          {/* <Button onClick={this.addButton.bind()} floated='right' circular icon='add' /> */}
        </Card.Content>


        <Modal size='tiny' open={modalSave} onClose={cancelModal}>
          <Modal.Header>Add Contact</Modal.Header>
          <Modal.Content>
            <Form error={error}>
              <Message
                error
                header={'Error ' + errStatus}
                content={
                  <List>
                    <List.Item>{errNameMsg}</List.Item>
                    <List.Item>{errContactMsg}</List.Item>
                    <List.Item>{errEmailMsg}</List.Item>
                    <List.Item>{errBirthDateMsg}</List.Item>
                    <List.Item>{errAddressMsg}</List.Item>
                    <List.Item>{errImageMsg}</List.Item>
                  </List>
                }
              />
              <Form.Input
                type='file'
                name='Image'
                placeholder='Image'
                label='Image'
                error={errImageMsg !== "" ? true : false}
                onChange={e => setImage(e.target.files[0])}
              />
              <Form.Input
                fluid
                id='form-subcomponent-shorthand-input-first-name'
                label='Name'
                placeholder='Name'
                error={errNameMsg !== "" ? true : false}
                onChange={e => setName(e.target.value)}
                value={name}
              />
              <Form.Input
                fluid
                id='form-subcomponent-shorthand-input-last-name'
                label='Contact'
                placeholder='contact'
                onChange={e => setContactNumber(e.target.value)}
                error={errContactMsg !== "" ? true : false}
                value={contactNumber}
              />
              <Form.Input
                fluid
                id='form-subcomponent-shorthand-input-last-name'
                label='Email'
                placeholder='roden@sample.com'
                error={errEmailMsg !== "" ? true : false}
                onChange={e => setEmail(e.target.value)}
                value={email}
              />
              <Form.Input
                fluid
                id='form-subcomponent-shorthand-input-last-name'
                label='Birth Date'
                placeholder='MM-DD-YYYY'
                type='date'
                error={errBirthDateMsg !== "" ? true : false}
                onChange={e => setBirthDate(e.target.value)}
                value={birthdate}
              />
              <Form.Input
                fluid
                id='form-subcomponent-shorthand-input-last-name'
                label='Address'
                placeholder='Batangas'
                error={errAddressMsg !== "" ? true : false}
                onChange={e => setAddress(e.target.value)}
                value={address}
              />
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={cancelModal}>Cancel</Button>
            {id === -1 ?
              <Button
                content='Save'
                loading={btnLoading}
                onClick={() => onSave('post')}
              /> :
              <Button
                content='Save'
                loading={btnLoading}
                onClick={() => onSave('put')}
              />
            }
          </Modal.Actions>
        </Modal>

        <Modal
          size='small'
          open={infoModal}
          onClose={() => setInfoModal(false)}
        >
          <Header content='Hi there!' />
          <Modal.Content>
            <p>This app was build using <b><a href='https://reactjs.org/'>React JS</a></b> + <b><a href='https://react.semantic-ui.com/'>Semantic UI</a></b> on frontend and <b><a href='https://www.djangoproject.com/'>Django</a></b> + <b><a href='https://www.django-rest-framework.org/'>Django REST Framework</a></b> as my API or backend.</p>
            <p>The app was hosted by <b><a href='www.heroku.com'>Heroku</a></b>.</p>
            <p>The Database I used was <b><a href='https://www.postgresql.org/'>Postgres</a></b>.</p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => setInfoModal(false)}>
              Okay
            </Button>
          </Modal.Actions>
        </Modal>

        <Modal
          size='small'
          open={delModal}
          onClose={cancelDelModal}
        >
          <Header content='Warning' />
          <Modal.Content>
            <p>Are you sure you want to delete this Employee?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={onDelete}>
              Okay
              </Button>
            <Button onClick={cancelDelModal}>
              Cancel
              </Button>
          </Modal.Actions>
        </Modal>

        <Portal open={delSuccess}>
          <Segment
            style={{
              left: '40%',
              position: 'fixed',
              top: '35%',
              zIndex: 1000,
              backgroundColor: '#4bb543',
              width: 350,
            }}
          >
            <Header style={{ color: 'white' }}>Success</Header>
            <p style={{ color: 'white' }}>Employee was successfully delete.d</p>
            <Button content='Okay' floated='right' onClick={() => setDelSuccess(false)} />
          </Segment>
        </Portal>
      </Card>
    </div>
  );
}

export default Phonebook;
