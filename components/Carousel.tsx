import React, { useRef, useState } from 'react';
import { 
  View, 
  StyleSheet, 
  Dimensions, 
  Image, 
  ViewStyle,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { COLORS } from '../constants/theme';
import { scale } from '../utils/scaling';

interface CarouselProps {
  images: string[];
  style?: ViewStyle;
  imageStyle?: ViewStyle;
  autoPlay?: boolean;
  interval?: number;
  showPagination?: boolean;
  onImagePress?: (index: number) => void;
}

const { width: screenWidth } = Dimensions.get('window');

const Carousel: React.FC<CarouselProps> = ({
  images,
  style,
  imageStyle,
  autoPlay = false,
  interval = 3000,
  showPagination = true,
  onImagePress,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (autoPlay && images.length > 1) {
      timer = setInterval(() => {
        if (activeIndex === images.length - 1) {
          flatListRef.current?.scrollToIndex({
            index: 0,
            animated: true,
          });
        } else {
          flatListRef.current?.scrollToIndex({
            index: activeIndex + 1,
            animated: true,
          });
        }
      }, interval);
    }
    
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [activeIndex, autoPlay, images.length, interval]);
  
  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    setActiveIndex(index);
  };
  
  const renderPagination = () => {
    if (!showPagination) return null;
    
    return (
      <View style={styles.paginationContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeIndex && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    );
  };
  
  return (
    <View style={[styles.container, style]}>
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            activeOpacity={onImagePress ? 0.9 : 1}
            onPress={() => onImagePress && onImagePress(index)}
            style={styles.imageContainer}
          >
            <Image
              source={{ uri: item }}
              style={[styles.image, imageStyle]}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
      />
      {renderPagination()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  imageContainer: {
    width: screenWidth,
  },
  image: {
    width: screenWidth,
    height: '100%',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: scale(16),
    flexDirection: 'row',
    alignSelf: 'center',
  },
  paginationDot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: scale(4),
  },
  paginationDotActive: {
    backgroundColor: COLORS.accent.primary,
    width: scale(16),
  },
});

export default Carousel;