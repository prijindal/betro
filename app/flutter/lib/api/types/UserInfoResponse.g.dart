// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'UserInfoResponse.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

UserInfoResponse _$UserInfoResponseFromJson(Map<String, dynamic> json) =>
    UserInfoResponse(
      id: json['id'] as String,
      username: json['username'] as String,
      is_following: json['is_following'] as bool,
      is_approved: json['is_approved'] as bool,
    )
      ..first_name = json['first_name'] as String?
      ..last_name = json['last_name'] as String?
      ..profile_picture = json['profile_picture'] as String?
      ..public_key = json['public_key'] as String?
      ..own_key_id = json['own_key_id'] as String?
      ..own_private_key = json['own_private_key'] as String?
      ..encrypted_profile_sym_key =
          json['encrypted_profile_sym_key'] as String?;

Map<String, dynamic> _$UserInfoResponseToJson(UserInfoResponse instance) =>
    <String, dynamic>{
      'first_name': instance.first_name,
      'last_name': instance.last_name,
      'profile_picture': instance.profile_picture,
      'public_key': instance.public_key,
      'own_key_id': instance.own_key_id,
      'own_private_key': instance.own_private_key,
      'encrypted_profile_sym_key': instance.encrypted_profile_sym_key,
      'id': instance.id,
      'username': instance.username,
      'is_following': instance.is_following,
      'is_approved': instance.is_approved,
    };
