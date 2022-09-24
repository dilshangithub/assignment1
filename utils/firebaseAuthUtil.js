import auth, {firebase} from '@react-native-firebase/auth';
import fireStore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Alert} from 'react-native';

async function createUser(useremail, password, firstName, lastName) {
  let topScore = 0;
  let user = null;

  console.log('Triggered Firebase/Auth/createUser');
  await auth()
    .createUserWithEmailAndPassword(useremail, password)
    .then(userCredential => {
      user = userCredential.user;

      if (user.uid != null) {
        const userRef = fireStore().doc(`users/${user.uid}`);
        const snapShot = userRef.get();

        if (!snapShot.exists) {
          const userid = user.uid;
          const email = user.email;
          const firstname = firstName;
          const lastname = lastName;
          const topscore = topScore;

          try {
            userRef.set({
              userid,
              email,
              firstname,
              lastname,
              topscore,
            });
          } catch (error) {
            console.log('Error in creating user, ' + error);
          }
        }
      }
      console.log('Created User ' + user.email);

      AsyncStorage.setItem('signin_user_firstname', firstName);
      AsyncStorage.setItem('signin_user_lastname',lastName);
      AsyncStorage.setItem('top_score', topScore.toString());
      AsyncStorage.setItem('signin_user_email', user.email.toString());
      AsyncStorage.setItem('is_signin_user', user.uid.toString());
      
      return user;
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('The Email address is already taken.');
        Alert.alert('Warning', 'The Email address is already taken.', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      }
      if (error.code === 'auth/invalid-email') {
        console.log('The Email address is invalid.');

        Alert.alert('Warning', 'The Email address is  is invalid.', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      }

      console.error(error);
    });

  return user;
}

async function loginUser(email, password) {
  let user = null;

  console.log('Triggered Firebase/Auth/loginUser');
  await auth()
    .signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      user = userCredential.user;
      console.log('Signin User ' + user.uid);

      if (user.uid) {
        const users = fireStore().collection('users');

        users.onSnapshot(querySnapshot => {
          querySnapshot.forEach(doc => {
            const {firstname, lastname, topscore, userid} = doc.data();

            if (userid === user.uid) {
              console.log('User Data: '+ firstname);

              AsyncStorage.setItem('signin_user_firstname', firstname);
              AsyncStorage.setItem('signin_user_lastname',lastname);
              AsyncStorage.setItem('top_score', topscore.toString());
              AsyncStorage.setItem('signin_user_email', user.email.toString());
              AsyncStorage.setItem('is_signin_user', user.uid.toString());
            }
          });
        });
      }

      return user;
    })
    .catch(error => {
      console.log('Cannot sign in');

      Alert.alert('Warning', 'Cannot sign in', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);

      console.error(error);
    });

  return user;
}

async function signout() {
  console.log('Triggered Firebase/Auth/signOut');
  auth()
    .signOut()
    .then(() => console.log('User sign out.'));
}

async function updateUserData(userId, email, updateFname, updateLname) {
  console.log('Triggered Firebase/Auth/updateUserData');
  await fireStore()
    .collection('users')
    .doc(userId)
    .update({
      firstname: updateFname,
      lastname: updateLname,
    })
    .then(
      AsyncStorage.setItem('signin_user_firstname', updateFname),
      AsyncStorage.setItem('signin_user_lastname', updateLname),
    );
}

//Need to check internet connection. if the connection is not available, need to store data in async storage
async function updateTopScore(userId, topScore) {
  console.log('Triggered Firebase/Auth/UpdateTopscore');
  await fireStore()
    .collection('users')
    .doc(userId)
    .update({
      topscore: topScore,
    })
    .then();
}

async function changeUserPassword(curPass, newPass) {
  console.log('Triggered Firebase/Auth/change password');
  console.log(curPass);
  console.log(newPass);

  var user = auth().currentUser;
  var cred = firebase.auth.EmailAuthProvider.credential(user.email, curPass);
  user
    .reauthenticateWithCredential(cred)
    .then(() => {
      user
        .updatePassword(newPass)
        .then(() => {
          Alert.alert('Success', 'Password was changed successfully.', [
            {text: 'OK', onPress: () => console.log('Password was changed.')},
          ]);
        })
        .catch(error => {
          Alert.alert(
            'Warning',
            'Someting went wrong while changing the password. Try again..',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          );
          return false;
        });
    })
    .catch(error => {
      Alert.alert(
        'Warning',
        'The password is invalid or the user does not have a password.',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      );
      return false;
    });
    return true;
}

const firebaseAuthUtil = {
  createUser,
  loginUser,
  signout,
  updateUserData,
  updateTopScore,
  changeUserPassword,
};

export default firebaseAuthUtil;
