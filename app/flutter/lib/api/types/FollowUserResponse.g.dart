// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'FollowUserResponse.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

FollowUserResponse _$FollowUserResponseFromJson(Map<String, dynamic> json) =>
    FollowUserResponse(
      json['is_following'] as bool,
      json['is_approved'] as bool,
      json['email'] as String,
    );

Map<String, dynamic> _$FollowUserResponseToJson(FollowUserResponse instance) =>
    <String, dynamic>{
      'is_following': instance.is_following,
      'is_approved': instance.is_approved,
      'email': instance.email,
    };
