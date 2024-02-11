import './loading.css';

interface LoadingProps {
  'data-testid': string;
}

const loading = ({ 'data-testid': testId }: LoadingProps): JSX.Element => {
  return <div className="loading" data-testid={testId} />;
};

export default loading;
