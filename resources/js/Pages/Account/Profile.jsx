import { useState } from "react"
import { CiUser } from "react-icons/ci";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string } from "yup";

import toast, { Toaster } from 'react-hot-toast';
import { editUser } from "../../services/account";
import { useAuth } from "../../hook/useAuth";

const userSchema = object({
    name: string().required('El nombre es requerido'),
    lastName: string().required('El apellido es requerido'),
    email: string().required('El correo electronico es requrido').email('debe ingresar un correo electronico valido')
});

export default function Profile() {
    const [showProfile, setShowProfile] = useState(true)
    const { setUser, user } = useAuth()

    const checkInput = (errors, touched, name) => {
        if (touched[name] === true) {
            return (errors[name] === undefined ? '' : 'border border-danger')
        }
    }

    const updateUser = async (user, setFieldError) => {
        try {
            const response = await editUser({
                ...user
            })

            setUser({...response.data.data.user})

            return true
        } catch (err) {
            if (err.response.data.errors !== undefined) {
                for (const [key, values] of Object.entries(err.response.data.errors)) {
                    setFieldError(key, values.join('\n'))
                }
            }

            toast.error(err.response.data.message);

            return false
        }
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="p-4 rounded shadow text-center mt-4">
                <span className="py-3 px-3 px-xl-2 py-xl-3 bg-dark bg-gradient text-white rounded-circle shadow avatar-profile">
                    <CiUser className="fs-1" />
                </span>

                {
                    showProfile && (
                        <div className="my-3">
                            <h2 className="fs-4 mb-0">{user.name}</h2>
                            <p className="mb-0 text-secondary">{user.email}</p>
                        </div>
                    )
                }

                {
                    !showProfile && (
                        <Formik
                            initialValues={{
                                name: user.name.split(' ')[0],
                                lastName: user.name.split(' ')[1],
                                email: user.email
                            }}
                            validationSchema={userSchema}
                            onSubmit={async (values, { setSubmitting, resetForm, setFieldError }) => {
                                const isUpdate = await updateUser(values, setFieldError)

                                if (isUpdate) {
                                    toast.success('Cuenta actualizada con exito')
                                    setShowProfile(true)
                                    setSubmitting(false)
                                }
                            }}
                        >
                            {
                                ({errors, touched, isSubmitting}) => (
                                    <Form className="my-3 mb-3 text-start">
                                        <div className="row mb-2">
                                            <div className="col-6">
                                                <label className="form-label" htmlFor="name">Nombre</label>
                                                <Field className={`form-control ${checkInput(errors, touched, 'name')}`} type="text" name="name" id="name" />
                                                <ErrorMessage className="text-danger" name="name" component="div" />
                                            </div>
                                            <div className="col-6">
                                                <label className="form-label" htmlFor="lastName">Apellido</label>
                                                <Field className={`form-control ${checkInput(errors, touched, 'lastName')}`} type="text" name="lastName" id="lastName" />
                                                <ErrorMessage className="text-danger" name="lastName" component="div" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <label className="form-label" htmlFor="email">Correo Electronico</label>
                                                <Field className={`form-control ${checkInput(errors, touched, 'email')}`} type="text" name="email" id="email" />
                                                <ErrorMessage className="text-danger" name="email" component="div" />
                                            </div>
                                        </div>

                                        <div className="text-center mt-3">
                                            <button className="btn btn-secondary me-2" onClick={() => setShowProfile(true)} type="button">
                                                Cancelar
                                            </button>
                                            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                                                Editar
                                            </button>
                                        </div>
                                    </Form>
                                )
                            }
                        </Formik>
                    )
                }

                {
                    showProfile && (
                        <button className="btn btn-primary me-2" onClick={() => setShowProfile(false)}>
                            Editar Perfil
                        </button>
                    )
                }
            </div>

            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
        </div>
    )
}
