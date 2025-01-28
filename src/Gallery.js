import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Image,
  Text,
  Input,
  Button,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Flex,
  Center,
} from '@chakra-ui/react';

const Gallery = () => {

  const [cars, setCars] = useState([]);
  const [makeFilter, setMakeFilter] = useState('');
  const [modelFilter, setModelFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [maxPrice, setMaxPrice] = useState(100000);
  const [expandedCarId, setExpandedCarId] = useState(null);


  //load cars data from API to populate gallery
  useEffect(() => {
    fetch('https://dealership.naman.zip/cars')
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
      })
      .catch((err) => {
        console.error('Error fetching cars:', err);
      });
  }, []);

  //sort by price button and API fetch
  const handleSortByPrice = () => {

    fetch('https://dealership.naman.zip/cars/sort?direction=asc&key=price')
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
      })
      .catch((err) => {
        console.error('Error sorting cars:', err);
      });
  };

  const handleSortByPriceDesc = () => {
    fetch('https://dealership.naman.zip/cars/sort?direction=desc&key=price')
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
      })
      .catch((err) => {
        console.error('Error sorting cars (descending):', err);
      });
  };

  //filter cars based on user's preferences
  const filteredCars = cars.filter((car) => {
    const matchesMake =
      car.make.toLowerCase().includes(makeFilter.toLowerCase());
    const matchesModel =
      car.model.toLowerCase().includes(modelFilter.toLowerCase());
    const matchesYear =
      car.year.toString().includes(yearFilter);

    const underMaxPrice = car.price <= maxPrice;

    return matchesMake && matchesModel && matchesYear && underMaxPrice;
  });

  //toggle current car details when clicked
  const handleCardClick = (carId) => {
    setExpandedCarId((prevId) => (prevId === carId ? null : carId));
  };


  return (
    <Box p={4} >
      <Box mb={6}>
        <Flex
          gap={4}
          flexWrap="wrap"
          alignItems="center"
          justifyContent="flex-start"
        >

          <Box>
            <Text mb={1} fontWeight="semibold">
              Make
            </Text>
            <Input
              placeholder="e.g. Toyota"
              value={makeFilter}
              onChange={(e) => setMakeFilter(e.target.value)}
              width="150px"
            />
          </Box>

          <Box>
            <Text mb={1} fontWeight="semibold">
              Model
            </Text>
            <Input
              placeholder="e.g. Corolla"
              value={modelFilter}
              onChange={(e) => setModelFilter(e.target.value)}
              width="150px"
            />
          </Box>

          <Box>
            <Text mb={1} fontWeight="semibold">
              Year
            </Text>
            <Input
              placeholder="e.g. 2020"
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              width="100px"
            />
          </Box>

          <Box>
            <Text mb={1} fontWeight="semibold">
              Max Price: ${maxPrice}
            </Text>
            <Slider
              aria-label="max-price-slider"
              value={maxPrice}
              onChange={(val) => setMaxPrice(val)}
              min={8000}
              max={100000} 
              step={1000}
              width="200px"
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>

          <Box>
            <Button
              colorScheme="blue"
              onClick={handleSortByPrice}
            >
              Sort by Price (Low-to-high)
            </Button>

            <Button
                colorScheme="blue"
                onClick={handleSortByPriceDesc}
                ml='10px'
            >
            Sort by Price (High-to-low)
            </Button>
          </Box>


        </Flex>
      </Box>

      <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
        {filteredCars.map((car) => (
          <Box
            key={car.id}
            bg="rgb(255,239,224)"
            borderRadius="md"
            overflow="hidden"
            boxShadow="md"
            transition="all 0.3s"
            cursor="pointer"
            _hover={{
              transform: 'translateY(-4px)',
              boxShadow: 'lg',
            }}
            // Toggle expanded info on click
            onClick={() => handleCardClick(car.id)}
          >
            
            <Image
              src={car.image}
              alt={`${car.brand} ${car.model}`}
              w="100%"
              h="200px"
              objectFit="cover"
            />

            {expandedCarId === car.id ? (
              <Box p={4} textAlign='center'>
                <Text fontWeight="bold" mb={1}>
                  Year: {car.year}
                </Text>
                <Text fontWeight="bold" mb={1}>
                  Make: {car.make}
                </Text>
                <Text fontWeight="bold" mb={1}>
                  Model: {car.model}
                </Text>
                <Text fontWeight="bold" mb={1}>
                  Price: ${car.price}
                </Text>
              </Box>
            ) : (
              <Box p={4}>
                <Flex justifyContent="space-between" alignItems="center">
                  <Text fontSize="lg" fontWeight="bold" mb={2}>
                    {car.make} {car.model}
                  </Text>
                  <Text fontSize="lg" fontWeight="bold" mb={2} textAlign="right">
                    ${car.price}
                  </Text>
                </Flex>
                
              </Box>
            )}
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default Gallery;
