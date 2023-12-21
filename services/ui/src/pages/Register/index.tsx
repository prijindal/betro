import React, { useCallback, useState } from "react";
import isEmpty from "lodash/isEmpty";
import throttle from "lodash/throttle";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { loggedIn } from "../../store/app/actions";
import CheckIcon from "@heroicons/react/solid/CheckIcon";
import ExclamationCircleIcon from "@heroicons/react/solid/ExclamationCircleIcon";
import BetroApiObject from "../../api/context";
import Button from "../../ui/Button";
import TextField from "../../ui/TextField";
import LoadingSpinner from "../../ui/LoadingSpinner";

const UsernameField: React.FunctionComponent<{
    value: string;
    onChange: (value: string) => void;
    errorMessage: string;
    label?: string;
    placeholder?: string;
    name: string;
    type: "text" | "email";
    checkFunction: (a: string) => Promise<boolean>;
}> = (props) => {
    const { value, onChange, errorMessage, placeholder, label, type, name, checkFunction } = props;
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [fieldvalue, setFieldvalue] = useState<string>(value);
    const handleFieldChange = (username: string) => {
        checkFunction(username)
            .then((data) => {
                setLoading(false);
                if (data === false) {
                    setError(errorMessage);
                } else {
                    onChange(username);
                    setError(null);
                }
            })
            .catch((error) => {
                setLoading(false);
                const message = error.response?.data?.data || errorMessage;
                setError(message);
            });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleFieldChangeThrottle = useCallback(throttle(handleFieldChange, 2000), []);
    const isErrored = fieldvalue.length === 0 || error != null;
    return (
        <div className="flex flex-col items-start">
            <div className="flex flex-row items-center">
                <TextField
                    type={type}
                    error={isErrored}
                    label={label}
                    name={name}
                    placeholder={placeholder}
                    required
                    value={fieldvalue}
                    onChange={(e) => {
                        setLoading(true);
                        setFieldvalue(e);
                        handleFieldChangeThrottle(e);
                    }}
                />
                <div className="text-center max-h-8 flex text-gray-500">
                    {isErrored ? (
                        <ExclamationCircleIcon className="heroicon" />
                    ) : loading ? (
                        <LoadingSpinner className="text-black" />
                    ) : (
                        <CheckIcon className="heroicon" />
                    )}
                </div>
            </div>
            {error && <div className="mt-2 text-sm text-red-500">{error}</div>}
        </div>
    );
};

const App: React.FC<any> = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEmpty(password) || password !== confirmPassword) {
            return;
        }
        setLoading(true);
        BetroApiObject.auth
            .register(username, email, password)
            .then((payload) => {
                setLoading(false);
                navigate("/home");
                if (payload) {
                    BetroApiObject.auth.storeLocal();
                    dispatch(loggedIn());
                }
            })
            .catch((error) => {
                console.error(error);
                const errorMessage = error.response?.data?.data || "Registration error";
                setLoading(false);
                setError(errorMessage);
            });
    };
    return (
        <React.Fragment>
            <div className={"shadow-2xl flex flex-col mt-12 max-w-xl p-16 mx-auto"}>
                <div>
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <div className="my-2 mx-auto text-center">
                            <div className="text-2xl text-gray-700">Welcome to Betro App.</div>
                            <div className="text-xl text-gray-500">Please register below</div>
                        </div>
                        <div className="my-2 mx-auto text-center">
                            <UsernameField
                                value={username}
                                onChange={setUsername}
                                errorMessage="Username is not available"
                                checkFunction={BetroApiObject.auth.isAvailableUsername}
                                name="username"
                                placeholder="Username"
                                type="text"
                            />
                        </div>
                        <div className="my-2 mx-auto text-center">
                            <UsernameField
                                value={email}
                                onChange={setEmail}
                                errorMessage="Email is not available"
                                checkFunction={BetroApiObject.auth.isAvailableEmail}
                                name="email"
                                placeholder="Email"
                                type="email"
                            />
                        </div>
                        <div className="my-2 mx-auto text-center">
                            <TextField
                                type="password"
                                disabled={loading}
                                name="password"
                                error={password.length === 0}
                                required
                                placeholder="Password"
                                value={password}
                                onChange={setPassword}
                            />
                        </div>
                        <div className="my-2 mx-auto text-center">
                            <TextField
                                type="password"
                                disabled={loading}
                                name="confirm_password"
                                error={confirmPassword.length === 0}
                                required
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={setConfirmPassword}
                            />
                        </div>
                        {error != null && (
                            <div className="my-2 mx-auto text-center">
                                <div className="my-2 text-sm text-gray-500">{error}</div>
                            </div>
                        )}
                        <div className="my-2 mx-auto text-center">
                            <Button aria-label="Register" disabled={loading} type="submit">
                                Register
                            </Button>
                        </div>
                        <div className="my-2 mx-auto text-center">
                            <Link to="/login">Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
};

export default App;
