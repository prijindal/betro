// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'FollowerResponse.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

FollowerResponse _$FollowerResponseFromJson(Map<String, dynamic> json) =>
    FollowerResponse(
      user_id: json['user_id'] as String,
      follow_id: json['follow_id'] as String,
      username: json['username'] as String,
      group_id: json['group_id'] as String,
      group_name: json['group_name'] as String,
      group_is_default: json['group_is_default'] as bool,
      is_following: json['is_following'] as bool,
      is_following_approved: json['is_following_approved'] as bool,
      first_name: json['first_name'] as String?,
      last_name: json['last_name'] as String?,
      profile_picture: json['profile_picture'] as String?,
      public_key: json['public_key'] as String?,
      own_key_id: json['own_key_id'] as String?,
      own_private_key: json['own_private_key'] as String?,
      encrypted_profile_sym_key: json['encrypted_profile_sym_key'] as String?,
    );

Map<String, dynamic> _$FollowerResponseToJson(FollowerResponse instance) =>
    <String, dynamic>{
      'first_name': instance.first_name,
      'last_name': instance.last_name,
      'profile_picture': instance.profile_picture,
      'public_key': instance.public_key,
      'own_key_id': instance.own_key_id,
      'own_private_key': instance.own_private_key,
      'encrypted_profile_sym_key': instance.encrypted_profile_sym_key,
      'user_id': instance.user_id,
      'follow_id': instance.follow_id,
      'username': instance.username,
      'group_id': instance.group_id,
      'group_name': instance.group_name,
      'group_is_default': instance.group_is_default,
      'is_following': instance.is_following,
      'is_following_approved': instance.is_following_approved,
    };
