interface JsErrorProps {
    host: string;
    project: string;
    logstore: string;
}
declare function JsError(props: JsErrorProps): void;

export { JsError };
