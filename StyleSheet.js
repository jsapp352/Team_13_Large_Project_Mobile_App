import { StyleSheet } from 'react-native';

export default StyleSheet.create(
    {
  circle: {
    marginTop: 0,
    marginRight: 40,
    marginBottom: 10,
    marginLeft: 40,
    minWidth: 90,
    minHeight: 90,
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 0, 0, 1)',
    fontSize: '2em',
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
    verticalAlign: 'middle',
    lineHeight: 90
  },
  header: {
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0
  },
  topBar: {
    backgroundColor: '#000',
    height: 60
  },
  title: {
    color: '#fff',
    fontWeight: '500',
    letterSpacing: 8,
    fontSize: '1.8em',
    marginLeft: 20,
    verticalAlign: 'middle',
    lineHeight: 60,
    float: 'left'
  },
  information: {
    backgroundColor: '#e0b400',
    backgroundImage: 'url(../img/bg-ucf.png)',
    backgroundPosition: 'top',
    height: 230
  },
  circleContainer: {
    height: 'inherit',
    alignItems: 'center',
    marginTop: 0,
    marginRight: 'auto',
    marginBottom: 0,
    marginLeft: 'auto',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center'
  },
  caption: {
    paddingTop: 30,
    color: '#fff',
    fontWeight: '500'
  },
  'menu-item': {
    textAlign: 'center',
    marginTop: 20,
    marginRight: 0,
    marginBottom: 20,
    marginLeft: 0,
    color: '#000'
  },
  'menu-icon': {
    fontSize: '2.5em'
  },
  line: {
    height: 1,
    width: '50%',
    marginTop: 0,
    marginRight: 'auto',
    marginBottom: 0,
    marginLeft: 'auto',
    backgroundColor: '#eaeaea'
  },
  'sub-title': {
    color: '#000',
    fontWeight: '700',
    fontSize: '1.5em',
    marginBottom: 20
  },
  'course-card': {
    width: 250,
    marginRight: '5%'
  }
}
);