// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'FollowUserRequest.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

FollowUserRequest _$FollowUserRequestFromJson(Map<String, dynamic> json) =>
    FollowUserRequest(
      followee_id: json['followee_id'] as String,
      own_key_id: json['own_key_id'] as String,
      followee_key_id: json['followee_key_id'] as String,
      encrypted_profile_sym_key: json['encrypted_profile_sym_key'] as String?,
    );

Map<String, dynamic> _$FollowUserRequestToJson(FollowUserRequest instance) =>
    <String, dynamic>{
      'followee_id': instance.followee_id,
      'own_key_id': instance.own_key_id,
      'followee_key_id': instance.followee_key_id,
      'encrypted_profile_sym_key': instance.encrypted_profile_sym_key,
    };
