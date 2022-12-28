// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'LikeResponse.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

LikeResponse _$LikeResponseFromJson(Map<String, dynamic> json) => LikeResponse(
      json['liked'] as bool,
      json['likes'] as int?,
    );

Map<String, dynamic> _$LikeResponseToJson(LikeResponse instance) =>
    <String, dynamic>{
      'liked': instance.liked,
      'likes': instance.likes,
    };
