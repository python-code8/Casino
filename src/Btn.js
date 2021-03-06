import { useRadio, Box, HStack, useRadioGroup } from "@chakra-ui/react"

function RadioCard(props) {
    const { getInputProps, getCheckboxProps } = useRadio(props)
  
    const input = getInputProps()
    const checkbox = getCheckboxProps()


    return (
      <Box as="label">
        <input {...input} />
        <Box
          {...checkbox}
          cursor="pointer"
          borderWidth="1px"
          borderRadius="md"
          boxShadow="md"
          _checked={{
            bg: "teal.600",
            color: "white",
            borderColor: "teal.600",
          }}
          _focus={{
            boxShadow: "outline",
          }}
          px={5}
          py={3}
        >
          {props.children}
        </Box>
      </Box>
    )
  }
  
  // Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
  function Example() {
    const options = ["Heads", "Tails"]
  
    const { getRootProps, getRadioProps } = useRadioGroup({
      name: "framework",
      defaultValue: "Heads",
      onChange: console.log,
    })
    
    
    const group = getRootProps()
    const getValue = (value) => {
        return getRadioProps(value).isChecked
    }
    return (
      <HStack {...group}>
        {options.map((value) => {
          const radio = getRadioProps({ value })
        
          return (
            <RadioCard key={value} {...radio}>
              {value}
            </RadioCard>
          )
        })}
      </HStack>
    )
  }
  
export default Example;