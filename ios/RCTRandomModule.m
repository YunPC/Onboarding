//
//  RCTRandomModule.m
//  OnboardingLaftel
//
//  Created by 윤다은 on 2023/03/27.
//

#import <Foundation/Foundation.h>
#import "RCTRandomModule.h"

@implementation RCTRandomModule : NSObject

RCT_EXPORT_MODULE(RandomModule)

RCT_EXPORT_METHOD(getRandomColor: (RCTPromiseResolveBlock) resolve rejecter: (RCTPromiseRejectBlock) reject){
  NSMutableArray *array = [NSMutableArray array];
  for(int i = 0; i < 3; i++){
    [array addObject:[NSNumber numberWithInt:(arc4random()%256)-1]];
  }
  resolve(array);
}

@end
