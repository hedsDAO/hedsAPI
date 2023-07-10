import { Input, FormControl, FormLabel, Select, Textarea } from '@chakra-ui/react';

interface OwnProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  inputType?: string;
  formType?: string;
  options?: Array<Record<string, string>>;
}

export const CustomFormInput = ({ label, placeholder, value, onChange, inputType = 'text', formType = 'text', options }: OwnProps) => {
  const renderInput = (formType: string) => {
    switch (formType) {
      case 'textarea':
        return <Textarea variant="flushed" borderColor="gray.400" color="gray.200" placeholder={placeholder} value={value} onChange={onChange} />;
      case 'select':
        return (
          <Select bg="white" color="gray.800" borderRadius="xl" w="fit-content" value={value} onChange={onChange}>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        );
      default:
        return (
          <Input
            placeholder={placeholder}
            variant="flushed"
            borderTop="none"
            borderLeft="none"
            borderRight="none"
            borderColor="gray.400"
            color="gray.200"
            value={value}
            onChange={onChange}
            type={inputType}
          />
        );
    }
  };

  return (
    <FormControl>
      <FormLabel color="gray.200" fontFamily="mono" fontWeight="semibold" fontSize="sm" letterSpacing="tight">
        {label}
      </FormLabel>
      {renderInput(formType)}
    </FormControl>
  );
};
