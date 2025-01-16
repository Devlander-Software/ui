import React, { useRef, useReducer, useEffect } from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Dimensions,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ViewStyle,
} from 'react-native';
import Slide from './Slide';
import PaginationStatus from './PaginationStatus';

const { width: initialScreenWidth } = Dimensions.get('window');

// State and Action Types
interface State {
  screenWidth: number;
  slidesPerPage: number;
  activeIndex: number;
}

type Action =
  | { type: 'SET_SCREEN_WIDTH'; payload: number }
  | { type: 'SET_SLIDES_PER_PAGE'; payload: number }
  | { type: 'SET_ACTIVE_INDEX'; payload: number };

// Reducer Function
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_SCREEN_WIDTH':
      return { ...state, screenWidth: action.payload };
    case 'SET_SLIDES_PER_PAGE':
      return { ...state, slidesPerPage: action.payload };
    case 'SET_ACTIVE_INDEX':
      return { ...state, activeIndex: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

// Props
export interface ResponsiveConfig {
  breakpoint: number; // Screen width breakpoint
  slidesPerPage: number; // Number of slides to show at this breakpoint
}

export interface CarouselProps {
  dotStyles?: {
    activeStyle?: ViewStyle;
    inactiveStyle?: ViewStyle;
  };
  slideStyles?: {
    height?: number;
    backgroundColor: string;
  };
  slides: { content: React.ReactNode; onPress?: () => void }[];
  spacing?: number; // Spacing between slides
  responsiveSlides?: ResponsiveConfig[]; // Responsive configuration for slides per page
}

const Carousel: React.FC<CarouselProps> = ({
  slides,
  dotStyles,
  slideStyles = {
    height: 160,
    backgroundColor: 'grey',
  },
  spacing = 15,
  responsiveSlides = [{ breakpoint: 0, slidesPerPage: 1 }], // Default to 1 slide per page
}) => {
  const flatListRef = useRef<FlatList<any>>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const [state, dispatch] = useReducer(reducer, {
    screenWidth: initialScreenWidth,
    slidesPerPage: responsiveSlides[0].slidesPerPage,
    activeIndex: 1, // Start at the first "real" slide
  });

  const { screenWidth, slidesPerPage, activeIndex } = state;

  // Determine slidesPerPage based on responsiveSlides
  useEffect(() => {
    const updateDimensions = () => {
      const width = Dimensions.get('window').width;
      dispatch({ type: 'SET_SCREEN_WIDTH', payload: width });

      const matchedConfig = responsiveSlides
        .slice()
        .reverse()
        .find(config => width >= config.breakpoint);
      dispatch({
        type: 'SET_SLIDES_PER_PAGE',
        payload: matchedConfig ? matchedConfig.slidesPerPage : 1,
      });
    };

    const subscription = Dimensions.addEventListener('change', updateDimensions);

    // Initialize on mount
    updateDimensions();

    return () => {
      subscription?.remove(); // Clean up event listener
    };
  }, [responsiveSlides]);

  // Calculate slide width based on slides per page
  const slideWidth =
    (screenWidth - spacing * (slidesPerPage - 1)) / slidesPerPage;

  const totalSlideWidth = slideWidth + spacing;

  // Add extra slides for seamless looping
  const slidesWithLoop = [
    { ...slides[slides.length - 1], id: `loop-start` },
    ...slides,
    { ...slides[0], id: `loop-end` },
  ];

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const calculatedIndex = Math.round(offsetX / totalSlideWidth);

    dispatch({ type: 'SET_ACTIVE_INDEX', payload: calculatedIndex });

    if (calculatedIndex === 0) {
      // Jump to the last real slide
      flatListRef.current?.scrollToOffset({
        offset: slides.length * totalSlideWidth,
        animated: false,
      });
      dispatch({ type: 'SET_ACTIVE_INDEX', payload: slides.length });
    } else if (calculatedIndex === slidesWithLoop.length - 1) {
      // Jump to the first real slide
      flatListRef.current?.scrollToOffset({
        offset: totalSlideWidth,
        animated: false,
      });
      dispatch({ type: 'SET_ACTIVE_INDEX', payload: 1 });
    }
  };

  useEffect(() => {
    const listener = scrollX.addListener(({ value }) => {
      const index = Math.round(value / totalSlideWidth);
      dispatch({ type: 'SET_ACTIVE_INDEX', payload: index });
    });

    return () => scrollX.removeListener(listener);
  }, [scrollX, totalSlideWidth]);

  return (
    <View>
      <Animated.FlatList
        ref={flatListRef}
        data={slidesWithLoop}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => `slide-${index}`}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onMomentumScrollEnd={handleScrollEnd}
        snapToInterval={totalSlideWidth} // Snap based on totalSlideWidth
        snapToAlignment="start" // Align to the start of each slide
        decelerationRate="fast"
        contentContainerStyle={{
          paddingHorizontal: (screenWidth - totalSlideWidth * slidesPerPage) / 2, // Ensure equal space on each side
        }}
        renderItem={({ item }) => (
          <View
            style={[
              styles.slideContainer,
              {
                width: slideWidth,
                marginHorizontal: spacing / 2,
                height: slideStyles.height ?? 160,
                backgroundColor: slideStyles.backgroundColor,
              },
            ]}
          >
            <Slide content={item.content} onPress={item.onPress || (() => {})} />
          </View>
        )}
      />
      <PaginationStatus
        activeIndex={activeIndex === 0 ? slides.length : activeIndex - 1}
        totalItems={slides.length}
        dotStyles={dotStyles}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  slideContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default Carousel;
