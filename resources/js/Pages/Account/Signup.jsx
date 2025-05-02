import SignupImage from "../../../images/curiosity-pana.png";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string, ref, boolean } from "yup";

import toast, { Toaster } from 'react-hot-toast';
import { createUser } from "../../services/account";

const userSchema = object({
    name: string().required('El nombre es requerido'),
    lastName: string().required('El apellido es requerido'),
    email: string().required('El correo electronico es requrido').email('debe ingresar un correo electronico valido'),
    password: string().required('La contraseña es requerida'),
    repeatPassword: string().required('Repetir contraseña es requerida').oneOf([ref('password'), null], 'La contraseña no coincide'),
    accept: boolean()
});

export default function Signup() {
    const checkInput = (errors, touched, name) => {
        if (touched[name] === true) {
            return (errors[name] === undefined ? '' : 'border border-danger')
        }
    }

    const sendUser = async (user, setFieldError) => {
        try {
            await createUser({
                ...user
            })

            return true
        } catch(err) {
            for (const [key, values] of Object.entries(err.response.data.errors)) {
                setFieldError(key, values.join('\n'))
            }

            toast.error(err.response.data.message);

            return false
        }
    }

    return (
        <div className="row">
            <div className="col-12 col-md-6">
                <h2>Crear una cuenta</h2>

                <Formik
                    initialValues={{
                        name: "",
                        lastName: "",
                        email: "",
                        password: "",
                        repeatPassword: "",
                        accept: true
                    }}
                    validationSchema={userSchema}
                    onSubmit={async (values, { setSubmitting, resetForm, setFieldError  }) => {
                        const isRegister = await sendUser(values, setFieldError)

                        if (isRegister) {
                            toast.success('Cuenta creada satisfactoriamente');
                            resetForm()

                            setTimeout(() => window.location.href = '/', 2000)
                        }

                        setSubmitting(false);
                    }}
                >
                    {({ errors, touched, isSubmitting }) => (
                        <Form>
                            <div className="bg-light p-4 rounded mb-3">
                                <h3 className="fs-5">Informacion Personal</h3>
                                <div className="row">
                                    <div className="col-md-12 col-xl-6 mb-2 mb-md-0">
                                        <label htmlFor="name">Nombre</label>
                                        <Field
                                            className={`form-control ${checkInput(errors, touched, 'name')}`}
                                            type="text"
                                            id="name"
                                            name="name"
                                        />
                                        <ErrorMessage className="text-danger" name="name" component="div" />
                                    </div>
                                    <div className="col-md-12 mb-2 mt-md-2 mt-xl-0 col-xl-6">
                                        <label htmlFor="last-name">
                                            Apellido
                                        </label>
                                        <Field
                                            className={`form-control ${checkInput(errors, touched, 'lastName')}`}
                                            type="text"
                                            id="last-name"
                                            name="lastName"
                                        />
                                        <ErrorMessage className="text-danger" name="lastName" component="div" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-light p-4 rounded">
                                <h3 className="fs-5">Crear Cuenta</h3>
                                <div className="row mb-2">
                                    <div className="col">
                                        <label htmlFor="email">
                                            Correo Electronico
                                        </label>
                                        <Field
                                            className={`form-control ${checkInput(errors, touched, 'email')}`}
                                            type="email"
                                            id="email"
                                            name="email"
                                            autoComplete="username"
                                        />
                                        <ErrorMessage className="text-danger" name="email" component="div" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 col-xl-6 mb-2 mb-md-0">
                                        <label htmlFor="password">
                                            Contraseña
                                        </label>
                                        <Field
                                            className={`form-control ${checkInput(errors, touched, 'password')}`}
                                            type="password"
                                            id="password"
                                            name="password"
                                            autoComplete="new-password"
                                        />
                                        <ErrorMessage className="text-danger" name="password" component="div" />
                                    </div>
                                    <div className="col-md-12 mt-md-2 mt-xl-0 col-xl-6">
                                        <label htmlFor="repeat-password">
                                            Repetir Contraseña
                                        </label>
                                        <Field
                                            className={`form-control ${checkInput(errors, touched, 'repeatPassword')}`}
                                            type="password"
                                            id="repeat-password"
                                            name="repeatPassword"
                                            autoComplete="new-password"
                                        />
                                        <ErrorMessage className="text-danger" name="repeatPassword" component="div" />
                                    </div>
                                </div>
                            </div>

                            <div className="d-grid gap-2 mt-2 mb-4">
                                <div className="text-center">
                                    <Field type="checkbox" name="accept" /> Aceptos todos los
                                    terminos y condiciones.
                                </div>
                                <button
                                    className="btn btn-primary"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    Unirme
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <div className="col-12 d-none d-md-block col-md-6 my-auto">
                <img src={SignupImage} style={{
                    width: '100%',
                    height: '35rem'
                }} />
            </div>

            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
        </div>
    );
}
