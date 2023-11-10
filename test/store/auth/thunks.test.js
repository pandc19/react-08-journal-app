import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from '../../../src/firebase/providers';
import {
    checkingAuthentication,
    checkingCredentials,
    login,
    logout,
    startCreatingUserWithEmailPassword,
    startGoogleSignIn,
    startLoginWithEmailPassword,
    startLogout
} from '../../../src/store/auth';
import { clearNotesLogout } from '../../../src/store/journal';
import { demoUser } from '../../fixtures/authFixtures';

jest.mock('../../../src/firebase/providers');

describe('Pruebas en AuthThunks', () => {
    const dispatch = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('debe de invocar el checkingCredentials', async () => {
        await checkingAuthentication()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    });

    test('startGoogleSignIn debe de llamar checkingCredentials y login - Éxito', async () => {
        const loginData = { ok: true, ...demoUser };
        await signInWithGoogle.mockResolvedValue(loginData);

        // thunk
        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));
    });

    test('startGoogleSignIn debe de llamar checkingCredentials y logout - Error', async () => {
        const loginData = { ok: false, errorMessage: 'Un error en Google' };
        await signInWithGoogle.mockResolvedValue(loginData);

        // thunk
        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
    });

    test('startCreatingUserWithEmailPassword debe de llamar checkingCredentials y login - Éxito', async () => {
        const registerData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '123456', displayName: demoUser.displayName };

        await registerUserWithEmailPassword.mockResolvedValue(registerData);

        // thunk
        await startCreatingUserWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login({
            uid: registerData.uid,
            displayName: registerData.displayName,
            email: registerData.email,
            photoURL: registerData.photoURL
        }));
    });

    test('startCreatingUserWithEmailPassword debe de llamar checkingCredentials y logout - Error', async () => {
        const registerData = { ok: false, errorMessage: 'Error en el registro de usuario' };
        const formData = { email: demoUser.email, password: '123456', displayName: demoUser.displayName };

        await registerUserWithEmailPassword.mockResolvedValue(registerData);

        // thunk
        await startCreatingUserWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout({ errorMessage: registerData.errorMessage }));
    });

    test('startLoginWithEmailPassword debe de llamar checkingCredentials y login - Éxito', async () => {
        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '123456' };

        await loginWithEmailPassword.mockResolvedValue(loginData);

        // thunk
        await startLoginWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));
    });

    test('startLoginWithEmailPassword debe de llamar checkingCredentials y logout - Error', async () => {
        const loginData = { ok: false, errorMessage: 'Error en login' };
        const formData = { email: demoUser.email, password: '123456' };

        await loginWithEmailPassword.mockResolvedValue(loginData);

        // thunk
        await startLoginWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(loginData));
    });

    test('startLogout debe de llamar logoutFirebase, clearNotes y logout', async () => {

        // thunk
        await startLogout()(dispatch);

        expect(logoutFirebase).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
        expect(dispatch).toHaveBeenCalledWith(logout());
    });
});