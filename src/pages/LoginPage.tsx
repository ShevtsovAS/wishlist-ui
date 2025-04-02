import { useForm } from 'react-hook-form'

type LoginFormInputs = {
    username: string
    password: string
}

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormInputs>()

    const onSubmit = (data: LoginFormInputs) => {
        console.log('Login data:', data)
        // Здесь позже добавим запрос к API
    }

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto' }}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Username</label>
                    <input
                        {...register('username', { required: 'Username is required' })}
                        type="text"
                    />
                    {errors.username && <p>{errors.username.message}</p>}
                </div>

                <div>
                    <label>Password</label>
                    <input
                        {...register('password', { required: 'Password is required' })}
                        type="password"
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>

                <button type="submit" style={{ marginTop: '10px' }}>
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginPage
