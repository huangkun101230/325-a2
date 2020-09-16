import {StyleSheet} from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundColor,
  },
  homeScreenImage: {
    width: undefined,
    height: undefined,
    flex: 1,
  },
  button: {
    marginTop: 32,
    marginHorizontal: 45,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.white,
    fontWeight: '500',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF88',
  },
  header: {
    paddingTop: 64,
    paddingBottom: 16,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: colors.backgroundColor,
    shadowOffset: {height: 5},
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
  },
  list: {
    marginHorizontal: 16,
  },
  listItem: {
    backgroundColor: colors.white,
    borderRadius: 5,
    padding: 8,
    // flexDirection: 'row',
    marginVertical: 8,
  },
  courseCode: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 8,
  },
  assiTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.white,
  },
  time: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.primary,
    borderRadius: 6,
    height: 50,
    width: 340,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18,
  },
});
